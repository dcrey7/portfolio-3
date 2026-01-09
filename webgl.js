// ============================================
// LIQUID GLASS WEBGL - Apple-style Effect
// Based on liquidGL shader techniques
// ============================================

let renderer, camera;
let backgroundScene, backgroundMaterial;
let refractionScene, refractionMaterial;
let backgroundTarget;

let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const lerpFactor = 0.1;
let isDarkMode = true;
let currentColor1 = new THREE.Vector3(0, 0, 0);
let currentColor2 = new THREE.Vector3(0.2, 0.4, 0.8);
let targetColor1 = new THREE.Vector3(0, 0, 0);
let targetColor2 = new THREE.Vector3(0.2, 0.4, 0.8);

const MAX_TILES = 30;


// Background shader
const backgroundFragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform vec3 color1;
    uniform vec3 color2;

    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = (uv * 2.0 - 1.0);
        vec2 m = (mouse / resolution.xy) * 2.0 - 1.0;

        vec2 flowVector = m - p;
        float dist = length(flowVector);
        vec2 offset = flowVector * 0.05 / (dist + 0.5);
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

// Apple-style Liquid Glass refraction shader
// Full tile coverage with rounded corners
const refractionFragmentShader = `
    uniform sampler2D backgroundTexture;
    uniform vec2 resolution;
    uniform float time;
    uniform vec4 tileBounds[30];
    uniform float tileRadius[30];
    uniform int tileCount;
    uniform float refractionStrength;
    uniform float bevelDepth;
    uniform float bevelWidth;
    uniform bool enableSpecular;
    uniform bool debugMode;

    varying vec2 vUv;

    // Signed Distance Function for rounded rectangle
    float sdRoundedBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + vec2(r);
        return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    }

    void main() {
        vec2 uv = vUv;

        // Check if we're inside any tile
        bool inTile = false;
        vec2 tileLocalUV = vec2(0.0);
        vec2 tileSize = vec2(0.0);
        float cornerRadius = 0.0;

        for (int i = 0; i < 30; i++) {
            if (i >= tileCount) break;

            vec4 tile = tileBounds[i];
            vec2 tPos = tile.xy;
            vec2 tSize = tile.zw;

            if (tSize.x <= 0.0 || tSize.y <= 0.0) continue;

            vec2 localUV = (uv - tPos) / tSize;

            if (localUV.x >= 0.0 && localUV.x <= 1.0 &&
                localUV.y >= 0.0 && localUV.y <= 1.0) {
                inTile = true;
                tileLocalUV = localUV;
                tileSize = tSize * resolution;
                cornerRadius = tileRadius[i];
                break;
            }
        }

        // If not in any tile, just show background
        if (!inTile) {
            gl_FragColor = texture2D(backgroundTexture, uv);
            return;
        }

        // We're inside the rectangular bounds - now check corners for rounding
        vec2 halfSize = tileSize * 0.5;

        // Distance from center in pixels
        vec2 fromCenter = abs(tileLocalUV - 0.5) * tileSize;

        // Distance into the corner region (positive if in corner area)
        vec2 cornerDist = fromCenter - (halfSize - cornerRadius);

        // Default: fully inside
        float mask = 1.0;

        // Only check rounding if we're in a corner region
        if (cornerDist.x > 0.0 && cornerDist.y > 0.0) {
            // In corner - check circular distance
            float dist = length(cornerDist) - cornerRadius;
            // Anti-alias the corner edge
            mask = 1.0 - smoothstep(0.0, 1.5, dist);
        }

        // If outside rounded corner, show background
        if (mask < 0.01) {
            gl_FragColor = texture2D(backgroundTexture, uv);
            return;
        }

        // DEBUG MODE: Show red overlay where shader thinks tiles are
        if (debugMode) {
            vec3 bg = texture2D(backgroundTexture, uv).rgb;
            gl_FragColor = vec4(mix(bg, vec3(1.0, 0.0, 0.0), mask * 0.5), 1.0);
            return;
        }

        // Centered coordinates (-0.5 to 0.5)
        vec2 centered = tileLocalUV - 0.5;

        // Calculate SDF for proper edge-based refraction
        vec2 pixelPos = centered * tileSize;
        float sdf = sdRoundedBox(pixelPos, halfSize, cornerRadius);

        // Edge distance (0 at edge, positive toward center)
        float edgeDist = -sdf / min(halfSize.x, halfSize.y);
        float edge = 1.0 - smoothstep(0.0, 0.15, edgeDist);

        // Direction from center
        vec2 dir = normalize(centered + 0.001);

        // Distance from center
        float dist = length(centered) * 2.0;

        // Refraction: stronger at edges
        float offsetAmt = edge * refractionStrength * 0.08;
        offsetAmt += pow(edge, 8.0) * bevelDepth * 0.05;

        // Apply distortion
        vec2 offset = dir * offsetAmt * dist;
        vec2 refractedUV = uv + offset;

        // Clamp to valid range
        refractedUV = clamp(refractedUV, vec2(0.0), vec2(1.0));

        // Sample with chromatic aberration at edges
        float aber = 0.003 * edge;
        float r = texture2D(backgroundTexture, refractedUV + vec2(aber, 0.0)).r;
        float g = texture2D(backgroundTexture, refractedUV).g;
        float b = texture2D(backgroundTexture, refractedUV - vec2(aber, 0.0)).b;

        vec3 color = vec3(r, g, b);

        // Specular highlights (animated light spots) - very subtle
        if (enableSpecular) {
            vec2 lp1 = vec2(sin(time * 0.2), cos(time * 0.3)) * 0.4 + 0.5;
            vec2 lp2 = vec2(sin(time * -0.3 + 1.5), cos(time * 0.2 - 0.5)) * 0.4 + 0.5;
            float h = 0.0;
            h += smoothstep(0.35, 0.0, distance(tileLocalUV, lp1)) * 0.02;
            h += smoothstep(0.4, 0.0, distance(tileLocalUV, lp2)) * 0.015;
            color += h;
        }

        // Very subtle edge brightening (reduced)
        color += vec3(edge * 0.008);

        // Blend with background using anti-aliased mask
        vec3 bg = texture2D(backgroundTexture, uv).rgb;
        color = mix(bg, color, mask);

        gl_FragColor = vec4(color, 1.0);
    }
`;

function init() {
    console.log('Initializing Liquid Glass...');

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const container = document.getElementById('webgl-container');
    if (!container) {
        console.error('webgl-container not found!');
        return;
    }
    container.appendChild(renderer.domElement);

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    backgroundTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * 2,
        window.innerHeight * 2,
        { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }
    );

    // Background scene
    backgroundScene = new THREE.Scene();
    backgroundMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            mouse: { value: new THREE.Vector2(0, 0) },
            color1: { value: currentColor1 },
            color2: { value: currentColor2 }
        },
        vertexShader: 'void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: backgroundFragmentShader
    });
    backgroundScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backgroundMaterial));

    // Refraction scene
    refractionScene = new THREE.Scene();

    const tileBoundsArray = [];
    const tileRadiusArray = [];
    for (let i = 0; i < MAX_TILES; i++) {
        tileBoundsArray.push(new THREE.Vector4(0, 0, 0, 0));
        tileRadiusArray.push(16.0); // Default 16px border-radius
    }

    refractionMaterial = new THREE.ShaderMaterial({
        uniforms: {
            backgroundTexture: { value: null },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            time: { value: 0.0 },
            tileBounds: { value: tileBoundsArray },
            tileRadius: { value: tileRadiusArray },
            tileCount: { value: 0 },
            refractionStrength: { value: 0.8 },
            bevelDepth: { value: 0.12 },
            bevelWidth: { value: 0.15 },
            enableSpecular: { value: true },
            debugMode: { value: false }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: refractionFragmentShader
    });

    refractionScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), refractionMaterial));

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', changeColorsOnClick);

    // Track tile hover/active states to update glass positions in real-time
    setupTileInteractionTracking();

    onWindowResize();
    startAutoColorChange();

    // Start animation immediately
    animate();

    // Update tile positions multiple times to ensure layout is stable
    // First update after initial render
    requestAnimationFrame(() => {
        updateTilePositions();
        console.log('Initial tile update');
    });

    // Second update after short delay
    setTimeout(() => {
        updateTilePositions();
        console.log('Tile update at 100ms');
    }, 100);

    // Third update after fonts/images likely loaded
    setTimeout(() => {
        updateTilePositions();
        console.log('Tile update at 500ms');
    }, 500);

    // Final update after everything should be stable
    setTimeout(() => {
        updateTilePositions();
        console.log('Final tile update at 1000ms, count:', refractionMaterial.uniforms.tileCount.value);
    }, 1000);
}

function updateTilePositions() {
    if (!refractionMaterial) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const tiles = document.querySelectorAll('.tile');
    let count = 0;

    tiles.forEach((tile, i) => {
        if (i >= MAX_TILES) return;

        const r = tile.getBoundingClientRect();
        const style = window.getComputedStyle(tile);

        // Get border-radius (in pixels)
        const borderRadius = parseFloat(style.borderRadius) || 16;

        // Convert to UV space
        const tx = r.left / w;
        const ty = 1.0 - (r.bottom / h);
        const tw = r.width / w;
        const th = r.height / h;

        // Update shader uniforms directly
        refractionMaterial.uniforms.tileBounds.value[i].set(tx, ty, tw, th);
        refractionMaterial.uniforms.tileRadius.value[i] = borderRadius;

        count++;
    });

    refractionMaterial.uniforms.tileCount.value = count;
}

window.updateTilePositions = updateTilePositions;

// Setup interaction tracking for tiles - simple version
function setupTileInteractionTracking() {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        // Update after hover transition completes
        tile.addEventListener('transitionend', () => {
            updateTilePositions();
        });
    });

    console.log('Tile interaction tracking enabled for', tiles.length, 'tiles');
}

function onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    renderer.setSize(w, h);
    backgroundTarget.setSize(w * 2, h * 2);
    backgroundMaterial.uniforms.resolution.value.set(w, h);
    refractionMaterial.uniforms.resolution.value.set(w, h);
    updateTilePositions();
}

function onMouseMove(e) {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
}

function lerp(a, b, t) { return a + (b - a) * t; }

function lerpVector(a, b, t) {
    return new THREE.Vector3(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
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

function changeColorsOnClick(e) {
    if (!e.target.closest('.tile, a, button')) {
        changeColors();
    }
}

function updateBackgroundMode(isLightMode) {
    isDarkMode = !isLightMode;
    changeColors();
}

function animate() {
    requestAnimationFrame(animate);

    mouseX = lerp(mouseX, targetMouseX, lerpFactor);
    mouseY = lerp(mouseY, targetMouseY, lerpFactor);

    currentColor1 = lerpVector(currentColor1, targetColor1, 0.05);
    currentColor2 = lerpVector(currentColor2, targetColor2, 0.05);

    backgroundMaterial.uniforms.time.value += 0.025;
    backgroundMaterial.uniforms.mouse.value.set(mouseX, window.innerHeight - mouseY);
    backgroundMaterial.uniforms.color1.value = currentColor1;
    backgroundMaterial.uniforms.color2.value = currentColor2;

    refractionMaterial.uniforms.time.value = backgroundMaterial.uniforms.time.value;

    // Render background to texture
    renderer.setRenderTarget(backgroundTarget);
    renderer.render(backgroundScene, camera);

    // Render refraction to screen
    renderer.setRenderTarget(null);
    refractionMaterial.uniforms.backgroundTexture.value = backgroundTarget.texture;
    renderer.render(refractionScene, camera);
}

// Controls
window.setGlassParams = function(p) {
    if (p.refractionStrength !== undefined) refractionMaterial.uniforms.refractionStrength.value = p.refractionStrength;
    if (p.bevelDepth !== undefined) refractionMaterial.uniforms.bevelDepth.value = p.bevelDepth;
    if (p.bevelWidth !== undefined) refractionMaterial.uniforms.bevelWidth.value = p.bevelWidth;
    if (p.enableSpecular !== undefined) refractionMaterial.uniforms.enableSpecular.value = p.enableSpecular;
    console.log('Glass params:', p);
};

window.glassPresets = {
    off: () => setGlassParams({ refractionStrength: 0, bevelDepth: 0, enableSpecular: false }),
    noShine: () => setGlassParams({ refractionStrength: 0.8, bevelDepth: 0.12, enableSpecular: false }),
    subtle: () => setGlassParams({ refractionStrength: 0.5, bevelDepth: 0.08, enableSpecular: true }),
    medium: () => setGlassParams({ refractionStrength: 0.8, bevelDepth: 0.12, enableSpecular: true }),
    strong: () => setGlassParams({ refractionStrength: 1.2, bevelDepth: 0.18, enableSpecular: true }),
    extreme: () => setGlassParams({ refractionStrength: 2.0, bevelDepth: 0.30, enableSpecular: true })
};

// Debug mode - shows red overlay where shader thinks tiles are
window.debugGlass = function(on) {
    refractionMaterial.uniforms.debugMode.value = on !== false;
    console.log('Debug mode:', on !== false ? 'ON (red = tile areas)' : 'OFF');
};

// Use 'load' event to ensure all resources are loaded before initializing
window.addEventListener('load', init);
