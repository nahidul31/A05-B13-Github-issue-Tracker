// login page get email and id--------------
function logInBtn() {
  const email = document.getElementById("email");
  const pass = document.getElementById("password");
  if (email.value === "admin" && pass.value === "admin123") {
    // console.log(email.value, pass.value);
    const mainPage = document.getElementById("mainPage");
    const logInPage = document.getElementById("login-page");
    logInPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
  } else {
    alert("Your mail and password are wrong (email:admin/pass:admin123) ");
  }
}
