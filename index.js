document.addEventListener("DOMContentLoaded", function() {

    const body = document.getElementById("body");
    const startctn = document.getElementById("startcontainer");
    const loginctn = document.getElementById("logincontainer");

    document.getElementById("logintogglebutton").addEventListener("click", function() {
        body.classList.replace("justify-center","justify-end");
        startctn.classList.toggle("hidden");
        loginctn.classList.toggle("hidden");
    });
    document.getElementById("signuptogglebutton").addEventListener("click", function() {
        alert("Signup!");
    });
});

