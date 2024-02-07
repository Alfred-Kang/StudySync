import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const apikey = "65b872123d3b7f1a90c26558"
const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

//check if user has logged in
if ((localStorage.getItem("id") == null)) {
  window.location.href = "./index.html";
} else {
  console.log('Logged in!')
}

//nav
document.getElementById("userprofile").addEventListener("mouseover", function() {
  document.getElementById("userdropdown").classList.toggle("hidden")
})
document.getElementById("hamburgermenu").addEventListener("mouseover", function() {
  document.getElementById("navbarhamburger").classList.toggle("hidden")
  document.getElementById("navbarhamburger").classList.toggle("absolute")
  document.getElementById("navbarhamburger").classList.toggle("top-28")
  document.getElementById("navbarhamburger").classList.toggle("left-0")
  document.getElementById("navbarhamburger").classList.toggle("z-50")
  document.getElementById("stupallogo").classList.toggle("drop-shadow-2xl")
})

const dashboardtoggle = document.getElementById("dashboardtoggle")
dashboardtoggle.addEventListener("click", function() {
  window.location.href = "./dashboard.html";
})

//logout
const logout = document.getElementById("logout")
logout.addEventListener("click", function() {
  localStorage.clear();
  window.location.href = "./index.html";
})
const logouthamburger = document.getElementById("logouthamburger")
logouthamburger.addEventListener("click", function() {
  console.log('trest')
  localStorage.clear();
  window.location.href = "./index.html";
})

document.getElementById("profileusername").innerHTML = localStorage.getItem("username")
document.getElementById("profileemail").innerHTML = localStorage.getItem("email")

// //lvl calculator
// document.getElementById("leveldisplay").innerHTML = `Level: ${Math.floor(localStorage.getItem('xp')/50000)}`
// let progress = ((localStorage.getItem('xp')%50000)/50000)*100
// document.getElementById("progbar").style.width = `${progress}%`
// document.getElementById("progbar").innerHTML = `${progress}%`


// document.getElementById("welcomename").innerHTML = `Welcome, ${localStorage.getItem("username")}!`

// // 3D Integration
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// //mouse
// let mouseX = window.innerWidth / 2;
// let mouseY = window.innerHeight / 2;

// let object;
// let controls;
// let objToRender = 'roomtestfinal';

// const loader = new GLTFLoader();

// loader.load(
//   'models/roomtestfinal.glb',
//   function (gltf) {
//     scene.add(gltf.scene);
//   },
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//   },
//   function (error) {
//     console.error(error);
//   }
// );

// //Instantiate a new renderer and set its size
// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth/1.2, window.innerHeight/1.2);

// //Add the renderer to the DOM
// document.getElementById("room3d").appendChild(renderer.domElement);

// //Set how far the camera will be from the 3D model
// camera.position.z = objToRender === "roomtestfinal" ? 25 : 500;

// //Add lights to the scene, so we can actually see the 3D model
// const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
// topLight.position.set(500, 500, 500);
// topLight.castShadow = true;
// scene.add(topLight);

// const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "roomtestfinal" ? 5 : 1);
// scene.add(ambientLight);

// //This adds controls to the camera, so we can rotate / zoom it with the mouse
// if (objToRender === "roomtestfinal") { 
//   controls = new OrbitControls(camera, renderer.domElement);
// }

// function animate() {
//   requestAnimationFrame(animate);

//   if (object && objToRender === "roomtestfinal") {
//     console.log('test')    
//     object.rotation.y = -3 + mouseX / window.innerWidth * 3;
//     object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
//   }
//   renderer.render(scene, camera);
// }

// //Add a listener to the window, so we can resize the window and the camera
// window.addEventListener("resize", function () {
//   camera.aspect = window.innerWidth/1.2 / window.innerHeight/1.2;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth/1.2, window.innerHeight/1.2);
// });

// //add mouse position listener, so we can make the eye move
// document.onmousemove = (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
// }

// animate();