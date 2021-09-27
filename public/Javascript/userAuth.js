//variable
const auth = firebase.auth();

/**Helper functions for signed out user redirection**/
//User is signed out
const signedOutRedirect = () => {
  if (window.location.pathname === "/Sunset-Portal/public/index.html") {
    window.location.href = "./Includes/signUpSignIn.html";
  } else {
    window.location.href = "./signUpSignIn.html";
  }
};

/**check user Authentication and Redirect**/
//Private redirection
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
      if (
        window.location.pathname ===
        "/Sunset-Portal/public/Includes/Lessons.html"
      ) {
        window.location.href = "./private.html";
      }
    } else {
      console.log("I need to redirect");
      signedOutRedirect();
    }
  });
};

//Private redirection
const lessonsCheckUser = () => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userEmail = user.email;
      console.log(`Sign in user is ${userEmail}`);
      if (window.location.pathname === "/Sunset-Portal/public/index.html") {
        window.location.href = "./Includes/Lessons.html";
      }
      if (
        window.location.pathname ===
        "/Sunset-Portal/public/Includes/RentMainPage.html"
      ) {
        window.location.href = "./Lessons.html";
      }
    } else {
      console.log("I need to redirect");
      signedOutRedirect();
    }
  });
};

/**Sign Out**/
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
