let scene, camera, renderer, material, plane;
let glassScene, glassCamera, glassRenderer, glassMaterial, glassPlane;
let renderTarget, backgroundTexture;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const lerpFactor = 0.1;
let isDarkMode = true;
let currentColor1 = new THREE.Vector3(0, 0, 0);
let currentColor2 = new THREE.Vector3(0.2, 0.4, 0.8);
let targetColor1 = new THREE.Vector3(0, 0, 0);
let targetColor2 = new THREE.Vector3(0.2, 0.4, 0.8);
let glassCanvas, glassContext;
let containerBounds = null;

// Vertex shader for glass effect
const glassVertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Fragment shader for glass refraction effect
const glassFragmentShader = `
    uniform sampler2D backgroundTexture;
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float refraction;
    uniform float aberration;
    uniform float thickness;
    uniform float clarity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Calculate glass surface normal - subtle variations for realistic glass
    vec3 getGlassNormal(vec2 uv) {
        // Distance from center
        float dist = length(uv - 0.5) * 2.0;
        
        // Subtle thickness variations across the glass
        float thicknessVar = thickness * (0.8 + 0.2 * sin(dist * 3.14159));
        
        // Very subtle surface imperfections
        float imperfection = sin(uv.x * 50.0) * sin(uv.y * 50.0) * 0.001;
        
        // Edge bevel effect
        float edgeBevel = smoothstep(0.85, 0.95, dist) * 0.1;
        
        vec3 normal = vec3(0.0, 0.0, 1.0);
        normal.x = (uv.x - 0.5) * edgeBevel;
        normal.y = (uv.y - 0.5) * edgeBevel;
        normal.z = 1.0 - edgeBevel + imperfection;
        
        return normalize(normal);
    }
    
    // Fresnel effect for glass
    float fresnel(vec3 normal, vec3 viewDir, float ior) {
        float cosTheta = abs(dot(normal, viewDir));
        float r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
        return r0 + (1.0 - r0) * pow(1.0 - cosTheta, 5.0);
    }
    
    void main() {
        vec2 uv = vUv;
        
        // Get glass surface normal
        vec3 normal = getGlassNormal(uv);
        
        // View direction
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        
        // Calculate refraction with glass IOR
        float ior = 1.52; // Typical glass IOR
        vec3 refracted = refract(-viewDir, normal, 1.0 / ior);
        
        // Calculate distortion based on glass thickness and refraction
        vec2 distortion = refracted.xy * refraction * thickness * 0.02;
        
        // Add subtle mouse interaction
        vec2 mouseOffset = (mouse / resolution - 0.5);
        float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, length(uv - 0.5 - mouseOffset * 0.2));
        distortion += mouseOffset * mouseInfluence * 0.01;
        
        // Sample background with chromatic aberration
        vec2 rOffset = uv + distortion * (1.0 + aberration * 0.01);
        vec2 gOffset = uv + distortion;
        vec2 bOffset = uv + distortion * (1.0 - aberration * 0.01);
        
        // Ensure we stay within bounds
        rOffset = clamp(rOffset, 0.001, 0.999);
        gOffset = clamp(gOffset, 0.001, 0.999);
        bOffset = clamp(bOffset, 0.001, 0.999);
        
        // Sample the background
        float r = texture2D(backgroundTexture, rOffset).r;
        float g = texture2D(backgroundTexture, gOffset).g;
        float b = texture2D(backgroundTexture, bOffset).b;
        
        vec3 color = vec3(r, g, b);
        
        // Apply glass clarity (slight tint/fog)
        color = mix(color, vec3(0.95, 0.97, 1.0), (1.0 - clarity) * 0.1);
        
        // Fresnel effect for reflections
        float fresnelFactor = fresnel(normal, viewDir, ior);
        
        // Add subtle reflections
        vec3 reflectionColor = vec3(0.9, 0.95, 1.0);
        color = mix(color, reflectionColor, fresnelFactor * 0.2);
        
        // Subtle specular highlight
        vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
        vec3 halfwayDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);
        color += vec3(1.0) * spec * 0.1;
        
        // Edge glow (very subtle)
        float edge = 1.0 - dot(normal, viewDir);
        color += vec3(0.9, 0.95, 1.0) * pow(edge, 3.0) * 0.1;
        
        // Subtle vignette effect
        float vignette = smoothstep(0.7, 1.0, length(uv - 0.5));
        color *= 1.0 - vignette * 0.05;
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

function init() {
    // Initialize main background scene
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

    // Create render target for background
    renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
    });

    // Background shader setup
    const geometry = new THREE.PlaneGeometry(2, 2);
    const fragmentShader = `
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform vec3 color1;
        uniform vec3 color2;

        #define FLOW_INTENSITY 0.05

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec2 p = (uv * 2.0 - 1.0);
            vec2 m = (mouse / resolution.xy) * 2.0 - 1.0;
            
            vec2 flowVector = m - p;
            float dist = length(flowVector);
            
            vec2 offset = flowVector * FLOW_INTENSITY / (dist + 0.5);
            p += offset;

            for(int i = 1; i < 7; i++) {
                float fi = float(i);
                p.x += 0.1 / fi * sin(fi * 2.0 * p.y + time * 0.25 + 0.2 * fi);
                p.y += 0.1 / fi * cos(fi * 2.0 * p.x + time * 0.25 + 0.2 * fi);
            }
            
            float intensity = 0.5 * sin(3.0 * p.x + 2.0 * p.y) + 0.5;
            vec3 color = mix(color1, color2, intensity);
            
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() },
            mouse: { value: new THREE.Vector2() },
            color1: { value: currentColor1 },
            color2: { value: currentColor2 }
        },
        fragmentShader: fragmentShader
    });

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Initialize glass effect
    initGlassEffect();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('click', changeColorsOnClick, false);

    onWindowResize();
    updateContainerBounds();
    startAutoColorChange();
    animate();
}

function initGlassEffect() {
    // Get glass canvas
    glassCanvas = document.getElementById('glass-canvas');
    glassContext = glassCanvas.getContext('webgl', { 
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true
    });

    // Create glass renderer using the canvas
    glassRenderer = new THREE.WebGLRenderer({ 
        canvas: glassCanvas,
        context: glassContext,
        alpha: true,
        antialias: true 
    });
    glassRenderer.setClearColor(0x000000, 0);

    // Glass scene setup
    glassScene = new THREE.Scene();
    glassCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    glassCamera.position.z = 1;

    // Glass material
    glassMaterial = new THREE.ShaderMaterial({
        uniforms: {
            backgroundTexture: { value: null },
            time: { value: 0 },
            resolution: { value: new THREE.Vector2() },
            mouse: { value: new THREE.Vector2() },
            refraction: { value: 1.0 },
            aberration: { value: 1.0 },
            thickness: { value: 1.0 },
            clarity: { value: 0.95 }
        },
        vertexShader: glassVertexShader,
        fragmentShader: glassFragmentShader,
        transparent: true
    });

    // Create glass plane
    const glassGeometry = new THREE.PlaneGeometry(2, 2);
    glassPlane = new THREE.Mesh(glassGeometry, glassMaterial);
    glassScene.add(glassPlane);
}

function updateContainerBounds() {
    const container = document.getElementById('portfolio-container');
    if (container) {
        containerBounds = container.getBoundingClientRect();
        
        // Update glass canvas size and position
        if (glassCanvas) {
            glassCanvas.style.left = containerBounds.left + 'px';
            glassCanvas.style.top = containerBounds.top + 'px';
            glassCanvas.width = containerBounds.width;
            glassCanvas.height = containerBounds.height;
            
            if (glassRenderer) {
                glassRenderer.setSize(containerBounds.width, containerBounds.height);
                glassMaterial.uniforms.resolution.value.set(containerBounds.width, containerBounds.height);
            }
        }
    }
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    material.uniforms.resolution.value.x = width;
    material.uniforms.resolution.value.y = height;

    // Update render target
    renderTarget.setSize(width, height);

    // Update container bounds
    updateContainerBounds();
}

function onMouseMove(event) {
    targetMouseX = event.clientX;
    targetMouseY = event.clientY;
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function lerpVector(start, end, t) {
    return new THREE.Vector3(
        lerp(start.x, end.x, t),
        lerp(start.y, end.y, t),
        lerp(start.z, end.z, t)
    );
}

function animate() {
    requestAnimationFrame(animate);

    mouseX = lerp(mouseX, targetMouseX, lerpFactor);
    mouseY = lerp(mouseY, targetMouseY, lerpFactor);

    currentColor1 = lerpVector(currentColor1, targetColor1, 0.05);
    currentColor2 = lerpVector(currentColor2, targetColor2, 0.05);

    material.uniforms.time.value += 0.025;
    material.uniforms.mouse.value.x = mouseX;
    material.uniforms.mouse.value.y = window.innerHeight - mouseY;
    material.uniforms.color1.value = currentColor1;
    material.uniforms.color2.value = currentColor2;

    // Render background to texture
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);

    // Render background to screen
    renderer.render(scene, camera);

    // Update glass effect if container is visible
    if (containerBounds && glassMaterial) {
        glassMaterial.uniforms.backgroundTexture.value = renderTarget.texture;
        glassMaterial.uniforms.time.value = material.uniforms.time.value;
        
        // Convert mouse position relative to container
        const relativeMouseX = mouseX - containerBounds.left;
        const relativeMouseY = mouseY - containerBounds.top;
        glassMaterial.uniforms.mouse.value.set(relativeMouseX, containerBounds.height - relativeMouseY);
        
        // Render glass effect
        glassRenderer.render(glassScene, glassCamera);
    }
}

function startAutoColorChange() {
    setInterval(changeColors, 45000);
}

function changeColors() {
    if (isDarkMode) {
        targetColor1 = new THREE.Vector3(0, 0, 0);
        targetColor2 = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    } else {
        targetColor1 = new THREE.Vector3(Math.random(), Math.random(), Math.random());
        targetColor2 = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    }
}

function changeColorsOnClick(event) {
    if (!event.target.closest('.tile, .nav-button, .back-btn, a, button')) {
        event.preventDefault();
        changeColors();
    }
}

function toggleMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.textContent = isDarkMode ? '☀️' : '🌑';

    changeColors();
}

// Function to be called from outside (e.g., from script.js)
function updateBackgroundMode(isLightMode) {
    isDarkMode = !isLightMode;
    changeColors();
}

// Function to update glass parameters
function updateGlassParams(params) {
    if (glassMaterial) {
        if (params.refraction !== undefined) {
            glassMaterial.uniforms.refraction.value = params.refraction;
        }
        if (params.aberration !== undefined) {
            glassMaterial.uniforms.aberration.value = params.aberration;
        }
        if (params.thickness !== undefined) {
            glassMaterial.uniforms.thickness.value = params.thickness;
        }
        if (params.clarity !== undefined) {
            glassMaterial.uniforms.clarity.value = params.clarity;
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleMode);
    }
});

// Export functions for external use
window.updateBackgroundMode = updateBackgroundMode;
window.updateGlassParams = updateGlassParams;
window.updateContainerBounds = updateContainerBounds