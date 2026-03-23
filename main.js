import * as THREE from "three";

const app = document.getElementById("app");

// --------------------
// 1. ВІДЕО З КАМЕРИ
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
video.style.background = "#000";

app.appendChild(video);

// --------------------
// 2. THREE.JS СЦЕНА
// --------------------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// --------------------
// 3. RENDERER
// --------------------
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "2";
renderer.domElement.style.pointerEvents = "none";

app.appendChild(renderer.domElement);

// --------------------
// 4. СВІТЛО
// --------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
directionalLight.position.set(3, 3, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.4);
pointLight.position.set(-3, -2, 4);
scene.add(pointLight);

// --------------------
// 5. КУБ
// --------------------
const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);

const material = new THREE.MeshStandardMaterial({
  color: 0xff2d55,
  metalness: 0.25,
  roughness: 0.3
});

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

// Контур, чтобы куб был еще заметнее
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
cube.add(line);

// --------------------
// 6. ФОНАРИК-ПЛЕЙСХОЛДЕР
// --------------------
const ringGeometry = new THREE.TorusGeometry(2.3, 0.03, 16, 100);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0x7dd3fc,
  transparent: true,
  opacity: 0.65
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.position.z = -1;
scene.add(ring);

// --------------------
// 7. ЗАПУСК КАМЕРИ
// --------------------
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = stream;
    await video.play();

    console.log("Камера запущена");
  } catch (error) {
    console.error("Помилка доступу до камери:", error);
    alert("Не вдалося отримати доступ до камери. Перевірте дозволи браузера та відкрийте сайт через GitHub Pages.");
  }
}

startCamera();

// --------------------
// 8. АНІМАЦІЯ
// --------------------
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  ring.rotation.z -= 0.004;

  renderer.render(scene, camera);
}

animate();

// --------------------
// 9. АДАПТАЦІЯ ПІД ЕКРАН
// --------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
