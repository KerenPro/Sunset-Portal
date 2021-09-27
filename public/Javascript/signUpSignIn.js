//Firebase Reference
const db = firebase.firestore();
const auth = firebase.auth();

//References to DB
const userRef = db.collection("Users");

//Redirect to Homepage
const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

/***Sign In***/
//Variables
const signInSubmitBtn = document.getElementById("signInSubmit");

auth.onAuthStateChanged((user) => {
  if (user) {
    const userEmail = firebase.auth().currentUser.email;
    userRef
      .doc(`${userEmail}`)
      .get()
      .then((doc) => {
        const userName = doc.data().name;
        document.getElementById("helloUser").innerHTML = `שלום ${userName}`;
        redirectToHomepage();
      });
  } else {
    document.getElementById("helloUser").innerHTML = "שלום אורח";
  }
});

signInSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const signInEmail = document.getElementById("signInEmail").value;
  const signInPass = document.getElementById("signInPass").value;

  auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return auth.signInWithEmailAndPassword(signInEmail, signInPass);
    })
    .then(() => {
      // Signed in
      console.log(auth.currentUser);
      console.log(auth);
      console.log(auth.currentUser.email);
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

/***Sign Up***/
//Using Date
const today = new Date();

//Variables
const signUpSubmitBtn = document.getElementById("signUpSubmit");
const form = document.getElementById("signUpForm");

//Add new user
signUpSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const signUpDate = today.toLocaleString();
  const clientId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phoneNum = document.getElementById("phone").value;
  const signUpEmail = document.getElementById("signUpEmail").value;
  const surfExp = document.getElementById("surfExp").value;
  const bday = document.getElementById("bday").value;

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
    .doc(`${signUpEmail}`)
    .set(newUser)
    .then((email, pass) => {
      const signUpEmail = document.getElementById("signUpEmail").value;
      const signUpPass = document.getElementById("signUpPass").value;
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
