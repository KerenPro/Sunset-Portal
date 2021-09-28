//variable
const auth = firebase.auth();
const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

/**check user Authentication and Redirect**/
//Private redirection
const privateNav = document.getElementById("private-link");
privateNav.addEventListener("click", (event) => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userEmail = user.email;
      console.log(`Sign in user is ${userEmail}`);
      window.location.href = "./private.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./signUpSignIn.html";
    }
  });
});

//Lessons redirection
const lessonsNav = document.getElementById("lessons-link");
lessonsNav.addEventListener("click", (event) => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userEmail = user.email;
      console.log(`Sign in user is ${userEmail}`);
      window.location.href = "./Lessons.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./signUpSignIn.html";
    }
  });
});

//Rent Main Page redirection
const rentHomepageNav = document.getElementById("rent-homepage-link");
rentHomepageNav.addEventListener("click", (event) => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userEmail = user.email;
      console.log(`Sign in user is ${userEmail}`);
      window.location.href = "./RentMainPage.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./signUpSignIn.html";
    }
  });
});

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
//updating for firebase
