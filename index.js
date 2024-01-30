document.addEventListener("DOMContentLoaded", async function () {

    const apikey = "65b872123d3b7f1a90c26558"
    const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

    const sendResponse = await fetch(apiurl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": apikey
        }
    })
    const data = await sendResponse.json()
    console.log(data)

    const postResponse = await fetch(apiurl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": apikey
        },
        body: JSON.stringify({
            "username": "iweurertu",
            "email": "b@a.com",
            "password": "hahaha L + RATIO"
        })
    })
    console.log(await postResponse.json())

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
      });

    const body = document.getElementById("body")
    const startctn = document.getElementById("startcontainer")
    const loginctn = document.getElementById("logincontainer")
    const signupctn = document.getElementById("signupcontainer")

    document.getElementById("logintogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        startctn.classList.toggle("hidden")
        loginctn.classList.toggle("hidden")
    })
    document.getElementById("signuptogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        startctn.classList.toggle("hidden")
        signupctn.classList.toggle("hidden")
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

