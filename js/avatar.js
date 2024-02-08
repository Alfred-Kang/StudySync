import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const apikey = "65b872123d3b7f1a90c26558"
const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

let activeSelected
let activeSelectedPath

document.getElementById('navavatar').addEventListener('click', async function() {
    document.getElementById('avatarcontainer').classList.toggle('hidden')

    console.log(JSON.parse(localStorage.getItem("avatar")).avatar2)

    if (JSON.parse(localStorage.getItem("avatar")).avatar2 !== "disabled" && document.getElementById('jerrylock').classList.contains("hidden") == false){
        document.getElementById('jerrylock').classList.add('hidden')
    }

    //checks activeSelected/selected avatar
    if (JSON.parse(localStorage.getItem("avatar")).avatar1 == "active") {
        activeSelected = 'Jeremy'
        activeSelectedPath = 'avatar1.glb'
    } else if (JSON.parse(localStorage.getItem("avatar")).avatar2 == "active") {
        activeSelected = 'Jerry'
        activeSelectedPath = 'avatar2.glb'
    } 
    refreshAvatar(activeSelected, activeSelectedPath)
})

//switch activeSelected avatar
document.getElementById('jeremyavatar').addEventListener('click', function() {
    activeSelected = 'Jeremy'
    refreshAvatar(activeSelected, activeSelectedPath)
})

document.getElementById('jerryavatar').addEventListener('click', function() {
    if (JSON.parse(localStorage.getItem("avatar")).avatar2 == 'inactive') {
        activeSelected = 'Jerry'
        refreshAvatar(activeSelected, activeSelectedPath)
    } else {
        console.log('Locked!')
        if (localStorage.getItem('coins') >= 100) {
            document.getElementById('avatarpurchasecontainer').classList.toggle('hidden')
        } else {
            alert("Insufficient Coins!")
        }
    }
})

document.getElementById('avatarpurchasesubmit').addEventListener('click', function() {
    localStorage.setItem('avatar', JSON.stringify({
            "avatar1": 'inactive',
            "avatar2": 'active'
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
                "avatar": localStorage.getItem('avatar'),
            })
        })
        console.log(postResponse.jsondata)

    document.getElementById('avatarpurchasecontainer').classList.toggle('hidden')
    document.getElementById('avatarcontainer').classList.toggle('hidden')
})

function refreshAvatar(activeSelected, activeSelectedPath) {

    if (JSON.parse(localStorage.getItem("avatar")).avatar2 !== "disabled" && document.getElementById('jerrylock').classList.contains("hidden") == false){
        document.getElementById('jerrylock').classList.add('hidden')
    }

    if (activeSelected == 'Jeremy') {
        activeSelectedPath = 'avatar1.glb'
    } else if (activeSelected == 'Jerry') {
        activeSelectedPath = 'avatar2.glb'
    }
    console.log(activeSelected,activeSelectedPath)

    document.getElementById("selectedavatartext").innerHTML = `SELECTED: ${activeSelected}`

    //remove old renderer
    if (document.getElementById('avatarpreview3d').hasChildNodes()) {
        document.getElementById('avatarpreview3d').removeChild(document.getElementById('avatarpreview3d').childNodes[0]);
      }

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.outputColorSpace = THREE.SRGBColorSpace

    renderer.setSize(document.getElementById('avatarpreview3d').offsetWidth, document.getElementById('avatarpreview3d').offsetHeight) //size
    renderer.setClearColor(0xffffff, 0) //color
    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    document.getElementById('avatarpreview3d').appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, document.getElementById('avatarpreview3d').offsetWidth/document.getElementById('avatarpreview3d').offsetHeight, 1, 1000)
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
    camera.aspect = document.getElementById('avatarpreview3d').offsetWidth/document.getElementById('avatarpreview3d').offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(document.getElementById('avatarpreview3d').offsetWidth, document.getElementById('avatarpreview3d').offsetHeight)
    })

    function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    }

    animate()
}

document.getElementById('avatareditsubmit').addEventListener('click', async function() {
    console.log(activeSelected)
    if (activeSelected == 'Jeremy') {
        localStorage.setItem('avatar', JSON.stringify({
            "avatar1": 'active',
            "avatar2": 'inactive'
        }))
    } else if (activeSelected == 'Jerry') {
        localStorage.setItem('avatar', JSON.stringify({
            "avatar1": 'inactive',
            "avatar2": 'active'
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
                "avatar": localStorage.getItem('avatar'),
            })
        })
        console.log(postResponse.jsondata)
        
    window.location.href = 'main.html'
})

document.getElementById('closeavatarcontainer').addEventListener('click', function() {
    document.getElementById('avatarcontainer').classList.toggle('hidden')
})

document.getElementById('closeavatarpurchasecontainer').addEventListener('click', function() {
    document.getElementById('avatarpurchasecontainer').classList.toggle('hidden')
})
