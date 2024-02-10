import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const apikey = "65b872123d3b7f1a90c26558"
const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

let activeSelected
let activeSelectedPath

document.getElementById('navroom').addEventListener('click', async function() {
    document.getElementById('roomcontainer').classList.toggle('hidden')

    if (JSON.parse(localStorage.getItem("room")).room2 !== "disabled" && document.getElementById('roomlock').classList.contains("hidden") == false){
        document.getElementById('roomlock').classList.add('hidden')
    }

    //checks activeSelected/selected room
    if (JSON.parse(localStorage.getItem("room")).room1 == "active") {
        activeSelected = 'bedroom'
        activeSelectedPath = 'room1.glb'
    } else if (JSON.parse(localStorage.getItem("room")).room2 == "active") {
        activeSelected = 'room'
        activeSelectedPath = 'room2.glb'
    } 
    refreshroom(activeSelected, activeSelectedPath)
})

//switch activeSelected room
document.getElementById('bedroomroom').addEventListener('click', function() {
    activeSelected = 'bedroom'
    refreshroom(activeSelected, activeSelectedPath)
})

document.getElementById('roomroom').addEventListener('click', function() {
    if (JSON.parse(localStorage.getItem("room")).room2 == 'inactive') {
        activeSelected = 'room'
        refreshroom(activeSelected, activeSelectedPath)
    } else if (JSON.parse(localStorage.getItem("room")).room2 == 'disabled'){
        if (localStorage.getItem('coins') >= 100) {
            document.getElementById('roompurchasecontainer').classList.toggle('hidden')
        } else {
            alert("Insufficient Coins!")
        }
    }
})

document.getElementById('roompurchasesubmit').addEventListener('click', function() {
    localStorage.setItem('room', JSON.stringify({
            "room1": 'inactive',
            "room2": 'active'
    }))
    
    const postResponse = fetch(`https://studypal-c298.restdb.io/rest/studypalusers/${localStorage.getItem('id')}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apikey
            },
            body: JSON.stringify({
                "username": localStorage.getItem('username'),
                "password": localStorage.getItem('password'),
                "email": localStorage.getItem('email'),
                "coins": localStorage.getItem('coins'),
                "room": localStorage.getItem('room'),
            })
        })

    document.getElementById('roompurchasecontainer').classList.toggle('hidden')
    document.getElementById('roomcontainer').classList.toggle('hidden')
})

function refreshroom(activeSelected, activeSelectedPath) {

    if (JSON.parse(localStorage.getItem("room")).room2 !== "disabled" && document.getElementById('roomlock').classList.contains("hidden") == false){
        document.getElementById('roomlock').classList.add('hidden')
    }

    if (activeSelected == 'bedroom') {
        activeSelectedPath = 'room1.glb'
    } else if (activeSelected == 'room') {
        activeSelectedPath = 'room2.glb'
    }

    document.getElementById("selectedroomtext").innerHTML = `SELECTED: ${activeSelected}`

    //remove old renderer
    if (document.getElementById('roompreview3d').hasChildNodes()) {
        document.getElementById('roompreview3d').removeChild(document.getElementById('roompreview3d').childNodes[0]);
      }

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.outputColorSpace = THREE.SRGBColorSpace

    renderer.setSize(document.getElementById('roompreview3d').offsetWidth, document.getElementById('roompreview3d').offsetHeight) //size
    renderer.setClearColor(0xffffff, 0) //color
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    document.getElementById('roompreview3d').appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, document.getElementById('roompreview3d').offsetWidth/document.getElementById('roompreview3d').offsetHeight, 1, 1000)
    camera.position.set(0, 15, 100) //cam position

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enabled - false
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableRotation = false
    controls.minDistance = 10
    controls.maxDistance = 20
    controls.minPolarAngle = 0.5
    controls.maxPolarAngle = 1.5
    controls.autoRotate = false
    controls.target = new THREE.Vector3(0, 1, 0)
    controls.update()

    const light = new THREE.AmbientLight(0x404040,20) // soft white light
    scene.add(light)

    const loader = new GLTFLoader().setPath('models/')
    loader.load(activeSelectedPath, (gltf) => {
    const mesh = gltf.scene

    mesh.traverse((child) => {
        if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        }
    })

    mesh.position.set(0, -3, 0)
    scene.add(mesh)
    })

    window.addEventListener('resize', () => {
    camera.aspect = document.getElementById('roompreview3d').offsetWidth/document.getElementById('roompreview3d').offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(document.getElementById('roompreview3d').offsetWidth, document.getElementById('roompreview3d').offsetHeight)
    })

    function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    }

    animate()
}

document.getElementById('roomeditsubmit').addEventListener('click', async function() {
    if (activeSelected == 'bedroom') {
        localStorage.setItem('room', JSON.stringify({
            "room1": 'active',
            "room2": 'inactive'
        }))
    } else if (activeSelected == 'room') {
        localStorage.setItem('room', JSON.stringify({
            "room1": 'inactive',
            "room2": 'active'
        }))
    }

    const postResponse = fetch(`https://studypal-c298.restdb.io/rest/studypalusers/${localStorage.getItem('id')}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apikey
            },
            body: JSON.stringify({
                "username": localStorage.getItem('username'),
                "password": localStorage.getItem('password'),
                "email": localStorage.getItem('email'),
                "coins": localStorage.getItem('coins'),
                "room": localStorage.getItem('room'),
            })
        })
        
    window.location.href = 'main.html'
})

document.getElementById('closeroomcontainer').addEventListener('click', function() {
    document.getElementById('roomcontainer').classList.toggle('hidden')
})

document.getElementById('closeroompurchasecontainer').addEventListener('click', function() {
    document.getElementById('roompurchasecontainer').classList.toggle('hidden')
})
