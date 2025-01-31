const apikey = "65b872123d3b7f1a90c26558"

//check if user has logged in
if ((localStorage.getItem("id") == null)) {
    window.location.href = "index.html"
  } 

let pfpPath
if (JSON.parse(localStorage.getItem("avatar")).avatar1 == 'active') {
  pfpPath = 'images/pfps/avatar1pfp.png'
} else if (JSON.parse(localStorage.getItem("avatar")).avatar2== 'active') {
  pfpPath = 'images/pfps/avatar2pfp.png'
} else {
  pfpPath = 'images/stupal.png'
}

document.getElementById('dashboardpfp').src = pfpPath

document.getElementById('dashboardusername').innerHTML = `${localStorage.getItem('username')}  <i id='editusername' class="hidden text-2xl fa-solid fa-pen-to-square fa-beat mx-8">`
document.getElementById('dashboardemail').innerHTML = `${localStorage.getItem('email')}  <i id='editemail' class="hidden text-2xl fa-solid fa-pen-to-square fa-beat mx-8">`

document.getElementById('dashboardlevel').innerHTML = `<i class="text-orange fa-2xl fa-solid fa-book-open xl:m-8 m-5"></i> Level<br>${Math.floor(localStorage.getItem('xp')/50000)}`
document.getElementById('dashboardcoins').innerHTML = `<i class="text-orange fa-2xl fa-solid fa-coins xl:m-8 m-5"></i> Coins<br>${localStorage.getItem('coins')}`
document.getElementById('dashboardstudyhrs').innerHTML = `<i class="text-orange fa-2xl fa-solid fa-graduation-cap xl:m-8 m-5"></i> Hours<br>${localStorage.getItem('studyhours')}`

document.getElementById('dashboardback').addEventListener('click', function() {
    window.location.href = 'main.html'
})

document.getElementById('dashboardusername').addEventListener('mouseover', function() {
    document.getElementById('editusername').classList.toggle('hidden')
})

document.getElementById('dashboardemail').addEventListener('mouseover', function() {
    document.getElementById('editemail').classList.toggle('hidden')
})

document.getElementById('dashboardusername').addEventListener('click', function() {
    document.getElementById('editusername').classList.toggle('hidden')
    document.getElementById('dashboardusername').classList.toggle('hidden')
    document.getElementById('editusernamefield').classList.toggle('hidden')
    document.getElementById('dashboardemail').classList.toggle('hidden')
})

document.getElementById('dashboardemail').addEventListener('click', function() {
    document.getElementById('dashboardusername').classList.toggle('hidden')
    document.getElementById('editusername').classList.toggle('hidden')
    document.getElementById('dashboardemail').classList.toggle('hidden')
    document.getElementById('editemailfield').classList.toggle('hidden')
})

document.getElementById("usernameeditsubmit").addEventListener("click", async function(e) {
    e.preventDefault()

    localStorage.setItem("username", document.getElementById("usernameinput").value)

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
        })
    })

    alert("Username Updated!")
    window.location.href = "dashboard.html";
})

document.getElementById("emaileditsubmit").addEventListener("click", async function(e) {
    e.preventDefault()

    //TODO throw errors if username or email is not unique in db
    //Check PW before changing detail

    localStorage.setItem("email", document.getElementById("emailinput").value)

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
        })
    })

    alert("Email Updated!")
    window.location.href = "dashboard.html";
})

