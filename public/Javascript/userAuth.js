//variable
const auth = firebase.auth();

/**Helper functions for Ifs**/
//User is signed out
const signedOutRedirect = () => {
  //Homepage
  if (window.location.pathname === "/Sunset-Portal/public/index.html") {
    window.location.href = "./Includes/signUpSignIn.html";
  } else {
    window.location.href = "./signUpSignIn.html";
  }
};

//check user auth state
const privateCheckUser = () => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userEmail = user.email;
      console.log(`Sign in user is ${userEmail}`);
      if (window.location.pathname === "/Sunset-Portal/public/index.html") {
        window.location.href = "./Includes/private.html";
      }
      if (
        window.location.pathname ===
        "/Sunset-Portal/public/Includes/RentMainPage.html"
      ) {
        window.location.href = "./private.html";
      }
    } else {
      console.log("I need to redirect");
      signedOutRedirect();
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
