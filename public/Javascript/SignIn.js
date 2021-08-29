const userEmail = document.getElementById("email");
const userPassword = document.getElementById("pass");

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in
      window.location.href = "../index.html";
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
