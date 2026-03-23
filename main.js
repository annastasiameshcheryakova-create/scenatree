import * as THREE from "three";

const app = document.getElementById("app");

// ---------------------
// VIDEO
// ---------------------
const video = document.createElement("video");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");
video.setAttribute("playsinline", "");

video.style.position = "absolute";
video.style.top = "0";
video.style.left = "0";
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";
video.style.zIndex = "1";
video.style.background = "#000";

app.appendChild(video);

// ---------------------
// THREE.JS SCENE
// ---------------------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "2";
renderer.domElement.style.pointerEvents = "none";

app.appendChild(renderer.domElement);

// ---------------------
// LIGHTS
// ---------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 3, 4);
scene.add(directionalLight);

// ---------------------
// OBJECT
// ---------------------
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({
  color: 0x00c6ff,
  metalness: 0.2,
  roughness: 0.35
});

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

// ---------------------
// CAMERA ACCESS
// ---------------------
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    });

    video.srcObject = stream;
    await video.play();
  } catch (error) {
    console.error("Помилка доступу до камери:", error);
    alert("Не вдалося отримати доступ до камери. Перевірте дозволи браузера та HTTPS.");
  }
}

startCamera();

// ---------------------
// ANIMATION
// ---------------------
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;

  renderer.render(scene, camera);
}

animate();

// ---------------------
// RESIZE
// ---------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
