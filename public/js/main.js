// ============================================
// 3D PLANET AND PARTICLE ANIMATIONS
// ============================================

// 3D PLANET SETUP
const canvas = document.getElementById("planetCanvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// PLANET WITH TEXTURE
const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x7c7cff,
  roughness: 0.4,
  metalness: 0.3,
});

// Load Earth texture
textureLoader.load(
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
  (texture) => {
    material.map = texture;
    material.needsUpdate = true;
  }
);

const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

// MOUSE INTERACTION
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0.002, y: 0 };

canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotationVelocity.y = deltaX * 0.005;
    rotationVelocity.x = deltaY * 0.005;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
});

// ANIMATION
function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    planet.rotation.y += rotationVelocity.y;
    planet.rotation.x += rotationVelocity.x;

    rotationVelocity.y *= 0.95;
    rotationVelocity.x *= 0.95;

    if (Math.abs(rotationVelocity.y) < 0.002) {
      rotationVelocity.y = 0.002;
    }
  }

  renderer.render(scene, camera);
}
animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// FLOATING PARTICLES
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDelay = Math.random() * 8 + "s";
  particle.style.animationDuration = Math.random() * 4 + 6 + "s";
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 10000);
}

setInterval(createParticle, 800);
