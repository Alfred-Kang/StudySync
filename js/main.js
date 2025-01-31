import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const apikey = "65b872123d3b7f1a90c26558"
const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

//check if user has logged in
if ((localStorage.getItem("id") == null)) {
  window.location.href = "index.html"
} 

window.setInterval(function() {
  if (document.readyState === 'ready' || document.readyState === 'complete') {
    document.getElementById('loadingcontainer').classList.add("hidden")
  } 
}, 1000);

//nav
let pfpPath
if (JSON.parse(localStorage.getItem("avatar")).avatar1 == 'active') {
  pfpPath = 'images/pfps/avatar1pfp.png'
} else if (JSON.parse(localStorage.getItem("avatar")).avatar2== 'active') {
  pfpPath = 'images/pfps/avatar2pfp.png'
} else {
  pfpPath = 'images/stupal.png'
}
document.getElementById('userpfp').src = pfpPath

document.getElementById("userprofile").addEventListener("click", function() {
  document.getElementById("userdropdown").classList.toggle("hidden")
})
document.getElementById("hamburgermenu").addEventListener("click", function() {
  document.getElementById("navbarhamburger").classList.toggle("hidden")
  document.getElementById("navbarhamburger").classList.toggle("absolute")
  document.getElementById("navbarhamburger").style.top = `${document.getElementById('navbar').offsetHeight}px`
  document.getElementById("navbarhamburger").classList.toggle("left-0")
  document.getElementById("navbarhamburger").classList.toggle("z-50")
  document.getElementById("stupallogo").classList.toggle("drop-shadow-2xl")
})

const dashboardtoggle = document.getElementById("dashboardtoggle")
dashboardtoggle.addEventListener("click", function() {
  if (document.getElementById('userdropdown').classList.contains('hidden')==false) {
    document.getElementById("userdropdown").classList.add("hidden")
  }
  if (document.getElementById("navbarhamburger").classList.contains('hidden')==false) {
    document.getElementById("navbarhamburger").classList.toggle("hidden")
    document.getElementById("navbarhamburger").classList.toggle("absolute")
    document.getElementById("navbarhamburger").classList.toggle("top-28")
    document.getElementById("navbarhamburger").classList.toggle("left-0")
    document.getElementById("navbarhamburger").classList.toggle("z-50")
    document.getElementById("stupallogo").classList.toggle("drop-shadow-2xl")
  }
  window.location.href = "dashboard.html"
})

//logout
const logout = document.getElementById("logout")
logout.addEventListener("click", function() {
  localStorage.clear()
  window.location.href = "index.html"
})
const logouthamburger = document.getElementById("logouthamburger")
logouthamburger.addEventListener("click", function() {
  localStorage.clear()
  window.location.href = "index.html"
})

document.getElementById("profileusername").innerHTML = localStorage.getItem("username")
document.getElementById("profileemail").innerHTML = localStorage.getItem("email")

// //lvl calculator
// document.getElementById("leveldisplay").innerHTML = `Level: ${Math.floor(localStorage.getItem('xp')/50000)}`
// let progress = ((localStorage.getItem('xp')%50000)/50000)*100
// document.getElementById("progbar").style.width = `${progress}%`
// document.getElementById("progbar").innerHTML = `${progress}%`


// document.getElementById("welcomename").innerHTML = `Welcome, ${localStorage.getItem("username")}!`



// 3D Integration

//render

let roomPath

if (JSON.parse(localStorage.getItem("avatar")).avatar1 == 'active' && JSON.parse(localStorage.getItem("room")).room1 == 'active') {
  roomPath = 'room1-avatar1.glb'
} else if (JSON.parse(localStorage.getItem("avatar")).avatar1 == 'active' && JSON.parse(localStorage.getItem("room")).room2 == 'active') {
  roomPath = 'room2-avatar1.glb'
} else if (JSON.parse(localStorage.getItem("avatar")).avatar2 == 'active' && JSON.parse(localStorage.getItem("room")).room1 == 'active') {
  roomPath = 'room1-avatar2.glb'
} else if (JSON.parse(localStorage.getItem("avatar")).avatar2 == 'active' && JSON.parse(localStorage.getItem("room")).room2 == 'active') {
  roomPath = 'room2-avatar2.glb'
}

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace

renderer.setSize(document.getElementById('room3d').offsetWidth, document.getElementById('room3d').offsetHeight) //size
renderer.setClearColor(0xffffff, 0) //color
renderer.setPixelRatio(window.devicePixelRatio)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

document.getElementById('room3d').appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, document.getElementById('room3d').offsetWidth/document.getElementById('room3d').offsetHeight, 1, 1000)
camera.position.set(0, 15, 100) //cam position

const controls = new OrbitControls(camera, renderer.domElement)
controls.enabled - false
controls.enableDamping = true
controls.enablePan = false
controls.enableRotation = false
controls.minDistance = 30
controls.maxDistance = 40
controls.minAzimuthAngle = -1
controls.maxAzimuthAngle = 1
controls.minPolarAngle = 0.5
controls.maxPolarAngle = 1.5
controls.autoRotate = false
controls.target = new THREE.Vector3(0, 1, 0)
controls.update()

const light = new THREE.AmbientLight(0x404040,20) // soft white light
scene.add(light)

const loader = new GLTFLoader().setPath('models/')
loader.load(roomPath, (gltf) => {
  const mesh = gltf.scene

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  mesh.position.set(0, -5, 0)
  scene.add(mesh)
})

window.addEventListener('resize', () => {
  camera.aspect = document.getElementById('room3d').offsetWidth/document.getElementById('room3d').offsetHeight
  camera.updateProjectionMatrix()
  renderer.setSize(document.getElementById('room3d').offsetWidth, document.getElementById('room3d').offsetHeight)
  if (document.getElementById('userdropdown').classList.contains('hidden')==false) {
    document.getElementById("userdropdown").classList.add("hidden")
  }
  if (document.getElementById("navbarhamburger").classList.contains('hidden')==false) {
    document.getElementById("navbarhamburger").classList.toggle("hidden")
    document.getElementById("navbarhamburger").classList.toggle("absolute")
    document.getElementById("navbarhamburger").classList.toggle("top-28")
    document.getElementById("navbarhamburger").classList.toggle("left-0")
    document.getElementById("navbarhamburger").classList.toggle("z-50")
    document.getElementById("stupallogo").classList.toggle("drop-shadow-2xl")
  }
})

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
