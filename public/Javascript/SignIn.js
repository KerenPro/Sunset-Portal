//Firebase Reference
const db = firebase.firestore();
const auth = firebase.auth();

//References to DB
const userRef = db.collection("Users");

//Variables
const submitBtn = document.getElementById("submit");

const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const emailField = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const email = emailField.toLowerCase();

  auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return auth.signInWithEmailAndPassword(email, pass);
    })
    .then(() => {
      // Signed in
      console.log(auth.currentUser);
      console.log(auth);
      console.log(auth.currentUser.email);
      userRef
        .doc(`${email}`)
        .get()
        .then((doc) => {
          const userName = doc.data().name;
          alert(`ברוכים הבאים, ${userName}`);
          redirectToHomepage();
        });
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        document.getElementById("error").innerHTML =
          "אחד מהשדות שהוזנו לא תואם את פרטי המשתמש. נסה שנית";
        console.log(errorMessage);
      }
    });
  return false;
});

/****THIS HELPS ME ****/
// Add a new document in collection "cities"
// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
//     .then(() => {
//         console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });

//Data types
// var docData = {
//     stringExample: "Hello world!",
//     booleanExample: true,
//     numberExample: 3.14159265,
//     dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
//     arrayExample: [5, true, "hello"],
//     nullExample: null,
//     objectExample: {
//         a: 5,
//         b: {
//             nested: "foo"
//         }
//     }
// };
// db.collection("data").doc("one").set(docData).then(() => {
//     console.log("Document successfully written!");
