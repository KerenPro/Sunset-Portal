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
    items.push("surf");
    console.log("surf is chosen");
  }

  if (sap.checked) {
    items.push("sap");
    console.log("sap is chosen");
  }

  if (cloth.checked) {
    items.push("cloth");
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
  const orderDateTime = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} ; ${today.getHours()}:${today.getMinutes()}`;
  let isHealthy;

  if (trueHealthy.checked) {
    isHealthy = true;
    console.log(isHealthy);
  } else if (falseHealthy.checked) {
    isHealthy = false;
    console.log(isHealthy);
  }

  console.log(firstName);
  //Finalize order object
  const order = {
    items: items,
    firstName: firstName,
    lastName: lastName,
    id: id,
    birthday: birthday,
    phoneNumber: phoneNumber,
    healthy: isHealthy,
    issues: issues,
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
