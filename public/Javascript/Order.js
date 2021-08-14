//Firebase Reference
const db = firebase.firestore();

//References to DB
const ordersRef = db.collection("Orders");

//Using Date
const today = new Date();

document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    const item = {
        product: "Board",
        price: 245,
        recommend: false
    };
    const orderDate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
    const orderTime = `${today.getHours()}:${today.getMinutes()}`;
    const orderPlacedTime = `${orderDate} ; ${orderTime}`;
    const clientId = 204631337;
    const rentDate = document.getElementById("date").value;
    const clientName = document.getElementById("name").value;
    const clientNumber = document.getElementById("phoneNum").value;
    const paymentCardNum = document.getElementById("creditNum").value;
    const cvvNum = document.getElementById("cvv").value;
    const expDate = document.getElementById("exDate").value;
    const payment = {
        card: paymentCardNum,
        cvv: cvvNum,
        expirationDate: expDate
    };

    const order = {
        orderPlacedTime: orderPlacedTime,
        clientId: clientId,
        items: item,
        clientName: clientName,
        rentDate: rentDate ,
        clientNumber: clientNumber,
        payment: payment
    }
    db.collection('Orders').add(order);
    alert("Order has been added successfully");
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
//
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
// });
