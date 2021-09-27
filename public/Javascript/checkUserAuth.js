// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyBsLq2Z1CMwKmEg0K47n9yCjnPeNhz4lqA",
  authDomain: "sunset-portal.firebaseapp.com",
  projectId: "sunset-portal",
  storageBucket: "sunset-portal.appspot.com",
  messagingSenderId: "861523328352",
  appId: "1:861523328352:web:5319424c8a9ca6778ef205",
  measurementId: "G-S8K9RDWCP8",
  databaseURL:
    "https://sunset-portal-default-rtdb.europe-west1.firebasedatabase.app/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//variable
const auth = firebase.auth();

//check user auth state
const privateCheckUser = () => {
  console.log("I'm inside the check Auth User");
  const user = auth.currentUser;

  // if (user) {
  //   // User is signed in, see docs for a list of available properties
  //   const userEmail = user.email;
  //   console.log(`Sign in user is ${userEmail}`);
  //   window.location.href = "./Includes/private.html";
  // } else {
  //   // No user is signed in.
  //   console.log("I need to redirect");
  //   window.location.href = "./Includes/signUpSignIn.html";
  // }

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
