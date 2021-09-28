//variable
const auth = firebase.auth();

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
      window.location.href = "./Includes/private.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./Includes/signUpSignIn.html";
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
      window.location.href = "./Includes/Lessons.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./Includes/signUpSignIn.html";
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
      window.location.href = "./Includes/RentMainPage.html";
    } else {
      console.log("I need to redirect");
      window.location.href = "./Includes/signUpSignIn.html";
    }
  });
});

/**Sign Out**/
const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", (event) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("התנתקת בהצלחה");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
//updating for firebase
