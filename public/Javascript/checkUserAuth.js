//check user auth state
const checkUserAuth = () => {
  console.log("I'm inside the check Auth User");
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     // User is signed in
  //     const userEmail = user.email;
  //     console.log(`Sign in user is ${userEmail}`);
  //   } else {
  //     // User is signed out
  //     console.log("I need to redirect");
  //     window.location.replace("../Includes/signUpSignIn.html");
  //   }
  // });
  const user = firebase.auth().currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    const userEmail = user.email;
    console.log(`Sign in user is ${userEmail}`);
  } else {
    // No user is signed in.
    console.log("I need to redirect");
    window.onbeforeunload = function () {
      window.location.href = "../Includes/signUpSignIn.html";
    };
  }
};
// const user = firebase.auth().currentUser;
//
// if (user) {
//   // User is signed in, see docs for a list of available properties
// } else {
//   // No user is signed in.
// }
