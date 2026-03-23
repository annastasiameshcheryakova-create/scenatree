import * as THREE from "three";

const app = document.getElementById("app");

// --------------------
// ВІДЕО
// --------------------
const video = document.createElement("video");
video.autoplay = true;
video.muted = true;
video.playsInline = true;

video.style.position = "absolute";
video.style.top = "0";
video.style.left = "0";
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";
video.style.zIndex = "1";

app.appendChild(video);

// --------------------
// THREE.JS
// --------------------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "2";

app.appendChild(renderer.domElement);

// --------------------
// СВІТЛО
// --------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(3, 3, 5);
scene.add(light);

// --------------------
// КУБ
// --------------------
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const material = new THREE.MeshStandardMaterial({
  color: 0xff2d55
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// --------------------
// КАМЕРА
// --------------------
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    video.srcObject = stream;
    await video.play();
  } catch (e) {
    alert("Камера не працює. Відкрий через GitHub Pages або дай доступ.");
    console.error(e);
  }
}

startCamera();

// --------------------
// АНІМАЦІЯ
// --------------------
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();

// --------------------
// RESIZE
// --------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
