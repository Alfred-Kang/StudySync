document.addEventListener("DOMContentLoaded", async function () {

    const apikey = "65b872123d3b7f1a90c26558"
    const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

    //check if user is logged in
    if ((localStorage.getItem("id") !== null)) {
        window.location.href = "/main.html";
    } else {
        console.log('Please Login')
    }

    document.getElementById("loginsubmitbutton").addEventListener("click", async function(e) {
        e.preventDefault()
        console.log('login btn clicked')

        let email = document.getElementById("loginemail").value;
        let password = document.getElementById("loginpassword").value;

        const sendResponse = await fetch(apiurl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apikey
            }
        })
        const data = await sendResponse.json()
        
        //login validation
        for (let i = 0; i < data.length; i++) {
            if (data[i].email == email && data[i].password == password) {
                console.log("Login Succesful!")

                //saving id to localstorage to save session login
                localStorage.setItem("id", data[i]._id)
                localStorage.setItem("idpos", i)

                window.location.href = "/main.html";
                break;
            } else {
                alert('Username or Password is Incorrect! Please Try Again')
            }
        }
    })
    document.getElementById("signupsubmitbutton").addEventListener("click", async function(e) {
        e.preventDefault()
        console.log('signup btn clicked')

        //TODO throw errors if username or email is not unique in db

        let username = document.getElementById("username").value;
        let email = document.getElementById("signupemail").value;
        let password = document.getElementById("signuppassword").value;
        let confirmpassword = document.getElementById("confirmpassword").value;

        //password confirmation validation
        if (password !== confirmpassword) {
            alert("Password confirmation does not match!");
        }
    
        const postResponse = await fetch(apiurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apikey
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        console.log(await postResponse.json())
    })

    const body = document.getElementById("body")
    const startctn = document.getElementById("startcontainer")
    const loginctn = document.getElementById("logincontainer")
    const signupctn = document.getElementById("signupcontainer")
    const logo = document.getElementById("loginlogo")

    document.getElementById("logintogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        startctn.classList.toggle("hidden")
        loginctn.classList.toggle("hidden")
        logo.classList.toggle("hidden")
    })
    document.getElementById("signuptogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        startctn.classList.toggle("hidden")
        signupctn.classList.toggle("hidden")
        logo.classList.toggle("hidden")
    })
    document.getElementById("loginherebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        signupctn.classList.toggle("hidden")
        loginctn.classList.toggle("hidden")
    })
    document.getElementById("signupherebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        loginctn.classList.toggle("hidden")
        signupctn.classList.toggle("hidden")
    })
})

