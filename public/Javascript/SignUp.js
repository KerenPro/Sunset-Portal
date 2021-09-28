//Firebase Reference
const db = firebase.firestore();

//Using Date
const today = new Date();

//Variables
const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");

/**Functionality**/
//Redirect back to Homepage
const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

//Add new user
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const signUpDate = today.toLocaleString();
  const clientId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phoneNum = document.getElementById("phone").value;
  const emailField = document.getElementById("email").value;
  const surfExp = document.getElementById("surfExp").value;
  const bday = document.getElementById("bday").value;
  const email = emailField.toLowerCase();

  const newUser = {
    signUpDate: signUpDate,
    clientId: clientId,
    name: name,
    address: address,
    phoneNum: phoneNum,
    email: email,
    surfExp: surfExp,
    birthday: bday,
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
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMsg = error.message;

          //email already is use
          if (errorCode === "auth/email-already-in-use") {
            document.getElementById("email-error").innerHTML =
              "האימייל שהוזן קיים במערכת";
            console.log(errorMsg);
          }

          //Password under 6 characters
          if (errorCode === "auth/weak-password") {
            document.getElementById("password-error").innerHTML =
              "הסיסמא צריכה להכיל יותר מ6 תוים";
            console.log(errorMsg);
          }
        });
    });

  return false;
});
