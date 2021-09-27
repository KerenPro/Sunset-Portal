//variable
const auth = firebase.auth();

//check user auth state
const privateCheckUser = () => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    window.location = "../Includes/private.html";
    const userEmail = user.email;
    console.log(`Sign in user is ${userEmail}`);
    window.location.href = "./Includes/private.html";
  } else {
    // No user is signed in.
    console.log("I need to redirect");
    window.location.href = "./Includes/signUpSignIn.html";
  }
};

auth.onAuthStateChanged((userLog) => {
  if (userLog) {
    const userEmail = userLog.email;
    document.getElementById("helloUser").innerHTML = `Hello ${userEmail}`;
    console.log(`Sign in user is ${userEmail}`);
    // ...
  }
});
