let scene, camera, renderer, material, plane;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const lerpFactor = 0.1;
let isDarkMode = true; // Start in dark mode
let currentColor1 = new THREE.Vector3(0, 0, 0); // Black
let currentColor2 = new THREE.Vector3(0.2, 0.4, 0.8); // Initial dark mode color
let targetColor1 = new THREE.Vector3(0, 0, 0);
let targetColor2 = new THREE.Vector3(0.2, 0.4, 0.8);

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

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    material.uniforms.resolution.value.x = width;
    material.uniforms.resolution.value.y = height;
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
    if (event.target.tagName.toLowerCase() !== 'a' && event.target.tagName.toLowerCase() !== 'button') {
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

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', toggleMode);
});

// Function to be called from outside (e.g., from script.js)
function updateBackgroundMode(isLightMode) {
    isDarkMode = !isLightMode;
    changeColors();
}