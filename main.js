// ============================================================================
// FILE: main.js
// ============================================================================
// Initializes a Three.js scene displaying a rotating Earth with clouds,
// dynamic lighting, and a surrounding starfield.
// ============================================================================

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import getStarfield from "./stars/getStarfield.js";

// ============================================================================
// INITIAL VIEWPORT SETUP
// ============================================================================
// Defines initial canvas dimensions and initializes WebGL renderer.
// ============================================================================
const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// ============================================================================
// CAMERA CONFIGURATION
// ============================================================================
// Perspective camera with moderate FOV and balanced clipping range.
// ============================================================================
const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 64;

// ============================================================================
// SCENE INITIALIZATION
// ============================================================================
// Creates core scene elements and base geometry for the Earth model.
// ============================================================================
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

const earthGroup = new THREE.Group();
const cloudGroup = new THREE.Group();
const starsGroup = new THREE.Group();
const lightGroup = new THREE.Group();

const earth = new THREE.SphereGeometry(16, 64, 64);

// Earth tilt adjustment (approx. 23.4°)
earthGroup.rotation.z = -23.4 * Math.PI / 180;

scene.add(earthGroup);
scene.add(cloudGroup);
scene.add(starsGroup);
scene.add(lightGroup);

// ============================================================================
// CAMERA CONTROLS
// ============================================================================
// Enables orbital movement around the scene with smooth damping.
// ============================================================================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// ============================================================================
// EARTH MATERIALS
// ============================================================================
// Base Earth texture with bump and specular maps for topographic depth.
// ============================================================================
const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load("./maps/earthmap1k.jpg"),
    bumpMap: loader.load("./maps/earthbump1k.jpg"),
    bumpScale: 50,
    specularMap: loader.load("./maps/earthspec1k.jpg"),
    specular: new THREE.Color(0x0000ff),
});
const earthMesh = new THREE.Mesh(earth, earthMaterial);

// ============================================================================
// CITY LIGHTS MATERIAL
// ============================================================================
// Adds emissive night lights visible on the planet’s dark side.
// ============================================================================
const lightsMaterial = new THREE.MeshStandardMaterial({
    emissiveMap: loader.load("./maps/earthlights1k.jpg"),
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 1.25,
    transparent: true,
    opacity: 0.5,
});
const lightsMesh = new THREE.Mesh(earth, lightsMaterial);
lightsMesh.scale.setScalar(1);
earthGroup.add(earthMesh, lightsMesh);

// ============================================================================
// CLOUD LAYERS
// ============================================================================
// Two semi-transparent layers simulate atmospheric depth and movement.
// ============================================================================
const innerCloudMaterial = new THREE.MeshPhongMaterial({
    map: loader.load("./maps/earthcloudmap.jpg"),
    bumpMap: loader.load("./maps/earthcloudmap.jpg"),
    bumpScale: 25,
    transparent: true,
    opacity: 0.125,
    blending: THREE.AdditiveBlending,
});
const innerCloudMesh = new THREE.Mesh(earth, innerCloudMaterial);
innerCloudMesh.scale.setScalar(1.00300);

const outerCloudMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("./maps/earthcloudmaptrans.jpg"),
    transparent: true,
    opacity: 0.125,
    blending: THREE.AdditiveBlending,
});
const outerCloudMesh = new THREE.Mesh(earth, outerCloudMaterial);
outerCloudMesh.scale.setScalar(1.0125);
cloudGroup.add(innerCloudMesh, outerCloudMesh);

// ============================================================================
// STARFIELD BACKGROUND
// ============================================================================
// Generates layered stars at multiple depths to create parallax effect.
// ============================================================================
const stars = 500;
const starsX_Low  = getStarfield({ numStars: stars, radius:  500 });
const starsX_Med  = getStarfield({ numStars: stars, radius:  750 });
const starsX_High = getStarfield({ numStars: stars, radius: 1000 });
starsGroup.add(starsX_Low, starsX_Med, starsX_High);

// ============================================================================
// LIGHTING
// ============================================================================
// Directional sunlight illumination; defines day/night hemisphere contrast.
// ============================================================================
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2000, -1250, 1500);
lightGroup.add(sunLight);

// ============================================================================
// FUNCTION: updateNightLights()
// ============================================================================
// Dynamically adjusts emissive city light visibility based on sunlight angle.
// ============================================================================
function updateNightLights() {
    const sunDirection = sunLight.position.clone().normalize();

    const earthNormal = new THREE.Vector3(0, 0, 1);
    earthGroup.localToWorld(earthNormal);
    earthNormal.normalize();

    const dot = sunDirection.dot(earthNormal);
    lightsMesh.material.opacity = Math.max(0, 0.75 * (1 - Math.max(0, dot)));
}

// ============================================================================
// FUNCTION: animate()
// ============================================================================
// Core render loop. Rotates Earth, clouds, and stars, and renders scene.
// ============================================================================
function animate() {
    requestAnimationFrame(animate);

    earthGroup.rotation.y += 0.00100;
    cloudGroup.rotation.y += 0.00150;
    starsGroup.rotation.y -= 0.00010;

    renderer.render(scene, camera);
}

// ============================================================================
// EVENT: WINDOW RESIZE
// ============================================================================
// Keeps renderer and camera responsive to browser window size changes.
// ============================================================================
window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.domElement.style.width = width + "px";
    renderer.domElement.style.height = height + "px";

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// ============================================================================
// EXECUTION START
// ============================================================================
animate();
