//Firebase Reference
const db = firebase.firestore();

//Using Date
const today = new Date();

//Variables
const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");

const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const signUpDate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
  const clientId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phoneNum = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const surfExp = document.getElementById("surfExp").value;

  const newUser = {
    signUpDate: signUpDate,
    clientId: clientId,
    name: name,
    address: address,
    phoneNum: phoneNum,
    email: email,
    surfExp: surfExp,
  };

  db.collection("Users")
    .doc(`${email}`)
    .set(newUser)
    .then((email, pass) => {
      const signUpEmail = document.getElementById("email").value;
      const signUpPass = document.getElementById("pass").value;
      firebase
        .auth()
        .createUserWithEmailAndPassword(signUpEmail, signUpPass)
        .then((signUpUser) => {
          let createdUser = signUpUser;
          alert("ההרשמה עברה בהצלחה");
          redirectToHomepage();
        });
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
