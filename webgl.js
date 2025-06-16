let scene, camera, renderer, material, plane;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const lerpFactor = 0.1;
let isDarkMode = true; // Start in dark mode
let currentColor1 = new THREE.Vector3(0, 0, 0); // Black
let currentColor2 = new THREE.Vector3(0.2, 0.4, 0.8); // Initial dark mode color
let targetColor1 = new THREE.Vector3(0, 0, 0);
let targetColor2 = new THREE.Vector3(0.2, 0.4, 0.8);

// Glass Layer Variables
let glassScene, glassCamera, glassRenderer, glassMaterial, glassPlane;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

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

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('click', changeColorsOnClick, false);

    onWindowResize();
    startAutoColorChange();
    animate();
}

// Glass Layer Functions
function initGlassLayer() {
    // Create glass layer scene
    glassScene = new THREE.Scene();
    glassCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    glassCamera.position.z = 1;

    glassRenderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    
    const glassContainer = document.getElementById('glass-layer');
    glassRenderer.domElement.style.position = 'absolute';
    glassContainer.appendChild(glassRenderer.domElement);

    const glassGeometry = new THREE.PlaneGeometry(2, 2);
    
    const glassVertexShader = `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    
    const glassFragmentShader = `
        uniform vec2 resolution;
        uniform float isDarkMode;
        
        #define REFRACTION_STRENGTH 1.5
        #define CHROMATIC_ABERRATION 0.2
        #define EDGE_GLOW 0.12
        
        // Simple noise for static glass texture
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        
        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            
            vec2 u = f * f * (3.0 - 2.0 * f);
            
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec2 center = vec2(0.5, 0.5);
            vec2 toCenter = uv - center;
            
            // Create rounded rectangle mask
            vec2 d = abs(toCenter) - vec2(0.485, 0.475);
            float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
            float mask = smoothstep(0.015, 0.0, dist);
            
            // Static glass distortion pattern - this never changes
            float n1 = noise(uv * 6.0) * 0.5 + 0.5;
            float n2 = noise(uv * 12.0 + vec2(17.3, 29.7)) * 0.5 + 0.5;
            float distortPattern = n1 * 0.7 + n2 * 0.3;
            
            // Base glass color
            vec3 glassColor = vec3(0.97, 0.98, 1.0);
            
            // Subtle chromatic aberration based on position
            vec3 chromaticShift;
            float angle = atan(toCenter.y, toCenter.x);
            chromaticShift.r = sin(angle * 2.0 + distortPattern * 3.14159) * CHROMATIC_ABERRATION;
            chromaticShift.g = sin(angle * 2.0 + distortPattern * 3.14159 + 2.094) * CHROMATIC_ABERRATION * 0.8;
            chromaticShift.b = sin(angle * 2.0 + distortPattern * 3.14159 + 4.189) * CHROMATIC_ABERRATION * 0.6;
            
            glassColor += chromaticShift;
            
            // Gradient lighting from top
            float topLight = pow(1.0 - uv.y, 2.2) * 0.25;
            glassColor += topLight * vec3(1.0, 0.97, 0.94);
            
            // Edge glow
            float edgeIntensity = 1.0 - smoothstep(0.0, 0.015, dist);
            glassColor += edgeIntensity * EDGE_GLOW * vec3(1.0, 0.97, 0.95);
            
            // Inner edge shadow for depth
            float innerShadow = smoothstep(0.01, 0.02, dist) * (1.0 - smoothstep(0.02, 0.04, dist));
            glassColor *= 1.0 - innerShadow * 0.1;
            
            // Frosted effect for light mode
            float frostiness = mix(0.0, 0.08, 1.0 - isDarkMode);
            glassColor = mix(glassColor, vec3(1.0), frostiness);
            
            // Alpha for transparency
            float alpha = mask * mix(0.08, 0.15, 1.0 - isDarkMode);
            
            // Add subtle texture variation
            alpha *= (0.95 + distortPattern * 0.05);
            
            gl_FragColor = vec4(glassColor, alpha);
        }
    `;

    glassMaterial = new THREE.ShaderMaterial({
        uniforms: {
            resolution: { value: new THREE.Vector2() },
            isDarkMode: { value: 1.0 }
        },
        vertexShader: glassVertexShader,
        fragmentShader: glassFragmentShader,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false
    });

    glassPlane = new THREE.Mesh(glassGeometry, glassMaterial);
    glassScene.add(glassPlane);

    updateGlassSize();
}

function updateGlassSize() {
    const container = document.querySelector('.portfolio-container');
    if (!container || !glassRenderer) return;
    
    const rect = container.getBoundingClientRect();
    
    glassRenderer.setSize(rect.width, rect.height);
    glassMaterial.uniforms.resolution.value.set(rect.width, rect.height);
    
    const glassLayer = document.getElementById('glass-layer');
    glassLayer.style.width = rect.width + 'px';
    glassLayer.style.height = rect.height + 'px';
    glassLayer.style.left = rect.left + 'px';
    glassLayer.style.top = rect.top + 'px';
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    material.uniforms.resolution.value.x = width;
    material.uniforms.resolution.value.y = height;
    
    // Also update glass size
    updateGlassSize();
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

    renderer.render(scene, camera);
    
    // Render glass layer
    if (glassRenderer) {
        glassRenderer.render(glassScene, glassCamera);
    }
}

function startAutoColorChange() {
    setInterval(changeColors, 45000); // Change colors every 45 seconds
}

function changeColors() {
    if (isDarkMode) {
        targetColor1 = new THREE.Vector3(0, 0, 0); // Always black in dark mode
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

    changeColors(); // Immediately change colors when toggling mode
}

// Function to be called from outside (e.g., from script.js)
function updateBackgroundMode(isLightMode) {
    isDarkMode = !isLightMode;
    changeColors();
    
    // Update glass layer mode
    if (glassMaterial) {
        glassMaterial.uniforms.isDarkMode.value = isDarkMode ? 1.0 : 0.0;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    // Initialize glass layer after a short delay
    setTimeout(() => {
        initGlassLayer();
        window.addEventListener('resize', updateGlassSize);
        window.addEventListener('scroll', updateGlassSize);
    }, 100);
    
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', toggleMode);
});