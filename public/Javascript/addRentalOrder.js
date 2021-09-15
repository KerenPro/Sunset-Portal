//Firebase Reference
const db = firebase.firestore();

//References to DB
const stockRef = db.collection("Stock");
const ordersRef = db.collection("Orders");
const boardsDocRef = stockRef.doc("Boards");
const supDocRef = stockRef.doc("Sup");
const clothingDocRef = stockRef.doc("Clothing");

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
  const itemType = document.getElementById("parit").value;
  const suit = document.getElementById("mida-suite").value;
  //if the itemType isn't empty - push it to items array
  if (itemType) {
    items.push(itemType);
  }
  if (suit) {
    items.push(suit);
  }

  //User details
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const id = document.getElementById("taz").value;
  const birthday = document.getElementById("leida").value;
  const phoneNumber = document.getElementById("phone").value;
  const health = document.getElementById("azhara");
  const issues = document.getElementById("reshimat-migbalot").value;
  const date = document.getElementById("taarih-azmana").value;
  const time = document.getElementById("from").value;
  const orderDate = new Date(`${date} ; ${time}`);
  const size = document.getElementById("mida").value;
  const orderDateTime = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} ; ${today.getHours()}:${today.getMinutes()}`;
  let isHealthy;

  if (health.checked) {
    isHealthy = true;
  } else {
    isHealthy = false;
  }

  //Finalize order object
  const order = {
    itemTypes: items,
    orderType: "השכרה",
    orderDate: orderDate,
    firstName: firstName,
    lastName: lastName,
    id: id,
    birthDate: birthday,
    phoneNumber: phoneNumber,
    isHealthy: isHealthy,
    knownIssues: issues,
    orderDateTime: orderDateTime,
    size: size,
  };

  ordersRef.add(order).then((docRef) => {
    alert(`ההזמנה נוספה בהצלחה. מספר הזמנה: ${docRef.id}`);
    console.log("add order");
    //redirectToHomepage();
  });
  return false;
});
