import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import testVertexShader from './shaders/test/vertex.glsl';
import testFragmentShader from './shaders/test/fragment.glsl';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereBufferGeometry(1, 128, 128);

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uFrequency: { value: 3 },
        uAmplitude: { value: 0.03 },
        uSpeed: { value: 0.2 },
        uCursorX: { value: 0.0 },
        uCursorY: { value: 0.0 },
    },
});

gui.add(material.uniforms.uFrequency, 'value')
    .name('frequncy')
    .min(0)
    .max(4)
    .step(0.01);
gui.add(material.uniforms.uAmplitude, 'value')
    .name('amplitude')
    .min(0)
    .max(1)
    .step(0.01);
gui.add(material.uniforms.uSpeed, 'value')
    .name('speed')
    .min(0)
    .max(1)
    .step(0.01);

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(0, 0, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

addEventListener('mousemove', (eve) => {
    material.uniforms.uCursorX.value = eve.clientX / sizes.width;
    material.uniforms.uCursorY.value = eve.clientY / sizes.height;
});
