document.addEventListener("DOMContentLoaded", async function () {

    const apikey = "65b872123d3b7f1a90c26558"
    const apiurl = "https://studypal-c298.restdb.io/rest/studypalusers"

    //check if user is logged in
    if ((localStorage.getItem("id") !== null)) {
        window.location.href = "main.html";
    } 

    var type = new Typed(".typingcaption", {
        strings: ["Infinite Customization Potential.", "Your Journey, Your Rules.", "Track, Learn, Lead."],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true
    })

    document.getElementById("loginsubmitbutton").addEventListener("click", async function(e) {
        e.preventDefault()

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

        for (let i = 0; i < data.length; i++) {
            if (data[i].email == email && data[i].password == password) {

                //saving id to localstorage to save session login
                localStorage.setItem("id", data[i]._id)
                localStorage.setItem("username", data[i].username)
                localStorage.setItem("email", data[i].email)
                localStorage.setItem("password", data[i].password)
                localStorage.setItem("xp", data[i].xp)
                localStorage.setItem("coins", data[i].coins)
                localStorage.setItem("studyhours", data[i].studyhours)
                localStorage.setItem("avatar", JSON.stringify(data[i].avatar))
                localStorage.setItem("room", JSON.stringify(data[i].room))
                localStorage.setItem("studysessionactive", false)

                window.location.href = "main.html";
                break;
            } else if (i>=data.length) {
                alert('Username or Password is Incorrect! Please Try Again')
            }
        }
    })
    document.getElementById("signupsubmitbutton").addEventListener("click", async function(e) {
        e.preventDefault()

        let username = document.getElementById("username").value;
        let email = document.getElementById("signupemail").value;
        let password = document.getElementById("signuppassword").value;
        let confirmpassword = document.getElementById("confirmpassword").value;

        //password confirmation validation
        if (password !== confirmpassword) {
            alert("Password confirmation does not match!");
        } else {
            const postResponse = await fetch(apiurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": apikey
                },
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password,
                    "coins": 150, //free 150 coins on signup
                    "xp": 0,
                    "studyhours": 0,
                    "avatar": JSON.stringify({
                        "avatar1": 'active',
                        "avatar2": 'disabled'
                    }),
                    "room": JSON.stringify({
                        "room1": 'active',
                        "room2": 'disabled'
                    })
                })
            })

            alert("Account Created, Login!")
            window.location.href='index.html'
        }
    })

    const body = document.getElementById("body")
    const signuploginctn = document.getElementById("signuplogincontainer")
    const loginctn = document.getElementById("logincontainer")
    const signupctn = document.getElementById("signupcontainer")

    document.getElementById("logintogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        signuploginctn.classList.toggle("hidden")
        loginctn.classList.toggle("hidden")
    })
    document.getElementById("signuptogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end")
        signuploginctn.classList.toggle("hidden")
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

