//check if user has logged in
if ((localStorage.getItem("id") == null)) {
  window.location.href = "/StudyPal/index.html";
} else {
  console.log('Logged in!')
}