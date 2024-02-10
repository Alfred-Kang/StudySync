//check if user has logged in
if ((localStorage.getItem("id") == null)) {
  window.location.href = "index.html";
}

document.getElementById('contactback').addEventListener('click', function() {
  window.location.href = 'main.html'
})