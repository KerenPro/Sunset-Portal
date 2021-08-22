//Firebase Reference
const db = firebase.firestore();

//Using Date
const today = new Date();

document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();

    const signUpDate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
    const clientId = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    const address = document.getElementById("address").value;
    const phoneNum = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const surfExp = document.getElementById("surfExp").value;

    const newUser = {
        signUpDate: signUpDate,
        clientId: clientId,
        name: name,
        pass: pass,
        address: address,
        phoneNum: phoneNum ,
        email: email,
        surfExp: surfExp
    }
    db.collection('Users').doc(`${clientId}`).set(newUser);
    firebase.auth().createUserWithEmailAndPassword(email, pass);

    alert("ההרשמה עברה בהצלחה");
    return false;
})

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

