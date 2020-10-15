const SCENE = new THREE.Scene();
const CLOCK = new THREE.Clock();
const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const MAXPARTICLES = 2000;
const RENDERER = new THREE.WebGLRenderer();
let deltaTime;

RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);



// camera
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 0;
camera.position.y =0;
camera.position.z = 300;

camera.lookAt(new THREE.Vector3(0, 0, 0));




// particles
let particles = new THREE.Geometry();
for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-300, 300),
    random(-10, 10),
    random(-300, 300)
  );
  particles.vertices.push(particle);
}
let particleMaterial = new THREE.PointsMaterial({
  color: 0xa49b72,
  size: 4,
});
let particleSystem = new THREE.Points(particles, particleMaterial);
particleSystem.sortParticles = true;
SCENE.add(particleSystem);



// random helper RNG
function random(min, max) {
    if (isNaN(max)) {``
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

//PLANET
  const SATURNTEX = new THREE.TextureLoader().load(
    'images/8k_saturn.jpg');
  const SATURNGEO = new THREE.SphereGeometry(100, 50, 50);
  const SATURNMAT = new THREE.MeshBasicMaterial({map: SATURNTEX});
  const SATURN = new THREE.Mesh(SATURNGEO, SATURNMAT);
  SATURN.position.x = 0;
  SATURN.position.y = 0;
  SATURN.position.z = 0;
  SCENE.add(SATURN);



// render loop
function render() {
    requestAnimationFrame(render);
  
    deltaTime = CLOCK.getDelta();
    
    particleSystem.rotation.y = Date.now() * 0.0002;
    RENDERER.render(SCENE, camera);
  }
  render();
  



// resize
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);