//Firebase Reference
const db = firebase.firestore();

//References to DB
const userRef = db.collection("Users");

//Variables
const submitBtn = document.getElementById("submit");

const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
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
      let errorCode = error.code;
      let errorMessage = error.message;
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
