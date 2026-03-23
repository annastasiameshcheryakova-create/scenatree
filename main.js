import * as THREE from "three";

// Сцена
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// Рендерер
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освітлення
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Куб
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 0x00c6ff});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 🎥 Веб-камера
const video = document.createElement("video");

navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
    video.srcObject = stream;
    video.play();
});

// Стилі відео
video.style.position = "absolute";
video.style.top = "0";
video.style.left = "0";
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";

document.body.appendChild(video);
document.body.appendChild(renderer.domElement);

// Анімація
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.015;

    renderer.render(scene, camera);
}

animate();

// Адаптивність
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
