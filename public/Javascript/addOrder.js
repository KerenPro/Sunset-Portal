//Firebase Reference
const db = firebase.firestore();

//References to DB
const stockRef = db.collection("Stock");
const ordersRef = db.collection("Orders");

//Using Date
const today = new Date();

//Back to Homepage
const redirectToHomepage = () => {
  window.location.href = "../index.html";
};

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  //What items are checked
  const items = [];
  const surf = document.getElementById("surf");
  const sap = document.getElementById("sap");
  const cloth = document.getElementById("cloth");

  if (surf.checked) {
    items.push("גלישה");
    console.log("surf is chosen");
  }

  if (sap.checked) {
    items.push("סאפ");
    console.log("sap is chosen");
  }

  if (cloth.checked) {
    items.push("ביגוד ימי");
    console.log("cloth is chosen");
  }

  //User details
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const id = document.getElementById("id").value;
  const birthday = document.getElementById("bday").value;
  const phoneNumber = document.getElementById("phoneNum").value;
  const trueHealthy = document.getElementById("tHealthy");
  const falseHealthy = document.getElementById("fHealthy");
  const issues = document.getElementById("issues").value;
  const date = document.getElementById("date").value;
  const orderDateTime = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} ; ${today.getHours()}:${today.getMinutes()}`;
  let isHealthy;

  if (trueHealthy.checked) {
    isHealthy = true;
    console.log(isHealthy);
  } else if (falseHealthy.checked) {
    isHealthy = false;
    console.log(isHealthy);
  }

  console.log(date);
  //Finalize order object
  const order = {
    itemTypes: items,
    date: firebase.firestore.Timestamp.fromDate(new Date(date)),
    firstName: firstName,
    lastName: lastName,
    id: id,
    birthDate: birthday,
    phoneNumber: phoneNumber,
    isHealthy: isHealthy,
    knownIssues: issues,
    orderDateTime: orderDateTime,
  };

  db.collection("Orders")
    .add(order)
    .then((docRef) => {
      alert(`ההזמנה נוספה בהצלחה. מספר הזמנה: ${docRef.id}`);
      console.log("add order");
      //redirectToHomepage();
    });
  return false;
});
