import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Convert degrees to radians
function degreesToRadians( degrees ) {
  return degrees * ( Math.PI / 180 );
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add light
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 20 );
pointLight.position.set( 1.5, 3.4, 5 );
pointLight.decay = 0.85;
scene.add( pointLight );

const loader = new GLTFLoader();
loader.load( './../assets/keycap.glb', function ( gltf ) {
  const object = gltf.scene;
  scene.add( object );
  camera.position.z = 5;

  // Set initial rotation of keycap
  object.rotation.x = degreesToRadians( 30 );
  object.rotation.y = degreesToRadians( -56 );
  object.rotation.z = degreesToRadians( 54 );

  gsap.to( object.rotation, {
    x: degreesToRadians( 139 ),
    y: degreesToRadians( 27 ),
    z: degreesToRadians( 6 ),
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    }
  } );
} );

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
