/**check user Authentication and Redirect**/

//Private redirection
const privateNav = document.getElementById("private-link");
privateNav.addEventListener("click", (event) => {
  console.log("I'm inside the check Auth User");
  const user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged((user) => {
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
  const user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged((user) => {
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
  const user = firebase.auth().currentUser;

  firebase
    .auth()
    .onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
        console.log(`Sign in user is ${userEmail}`);
        window.location.href = "./RentMainPage.html";
      } else {
        console.log("I need to redirect");
        window.location.href = "./signUpSignIn.html";
      }
    })
    .then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userEmail = firebase.auth().currentUser.email;
          firebase
            .firestore()
            .collection("Users")
            .doc(`${userEmail}`)
            .get()
            .then((doc) => {
              const userName = doc.data().name;
              document.getElementById(
                "helloUser"
              ).innerHTML = `שלום ${userName}`;
            });
        } else {
          document.getElementById("helloUser").innerHTML = "שלום אורח";
        }
      });
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
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
