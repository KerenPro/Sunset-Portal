//variable
const auth = firebase.auth();

//check user auth state
const privateCheckUser = () => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userEmail = user.email;
      console.log(`Sign in user is ${userEmail}`);
      window.location.href = "./Includes/private.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./Includes/signUpSignIn.html";
    }
  });
};

//sign out
const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("התנתקת בהצלחה");
      redirectToHomepage();
    })
    .catch((error) => {
      // An error happened.
    });
};
