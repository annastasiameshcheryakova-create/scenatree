import * as THREE from "three";

const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Рендер
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Світло (щоб було красивіше)
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

// Куб
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 0x00ffff});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Веб-камера
const video = document.createElement("video");

navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
  video.srcObject = stream;
  video.play();
});

video.style.position = "absolute";
video.style.top = "0";
video.style.left = "0";
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";
document.body.appendChild(video);

// Анімація
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();
