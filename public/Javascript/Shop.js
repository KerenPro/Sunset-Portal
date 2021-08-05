//Firebase Reference
const db = firebase.firestore();

//References to DB
const stockRef = db.collection("Stock");
const boardsDocRef = stockRef.doc("Boards");
const menSuitsDocRef = stockRef.doc("men-suits");
const womenSuitsDocRef = stockRef.doc("women-suits");
const accessoriesDocRef = stockRef.doc("accessories");

/*** Recommendations **/
//Variables for Recommendations
const recBoard = document.getElementById("recBoard");
const recMenSuit = document.getElementById("recMenSuit");
const recWomenSuit = document.getElementById("recWomenSuit");
const recAccess = document.getElementById("recAccess");

//Board
boardsDocRef.get().then( snap => {
    let data = snap.data();
    console.log(snap.id + " inside the then");
    for (let i in data){
        console.log(snap.id + " inside the for loop");
        if (data[i].recommend === true){
            console.log(snap.id + " inside the if recommends");
            let prodName = data[i].productName;
            let prodImg = data[i].img;
            let prodPrice = data[i].price;
            console.log(prodImg)
            recBoard.getElementsByClassName("rec-title")[0].innerHTML= prodName;
            recBoard.getElementsByClassName("rec-img")[0].innerHTML= "<img class='rec-img' src=\'"+prodImg+"\'>";
            recBoard.getElementsByClassName("rec-price")[0].innerHTML= prodPrice + "ILS";
            break;
        }}
    });

//Men's Suit
menSuitsDocRef.get().then( snap => {
    let data = snap.data();
    console.log(snap.id + " inside the then");
    for (let i in data){
        console.log(snap.id + " inside the for");
        if (data[i].recommend === true){
            console.log(snap.id + " inside the if");
            let prodName = data[i].productName;
            let prodImg = data[i].img;
            let prodPrice = data[i].price;
            recMenSuit.getElementsByClassName("rec-title")[0].innerHTML= prodName;
            recMenSuit.getElementsByClassName("rec-img")[0].innerHTML= "<img class='rec-img' src=\'"+prodImg+"\'>";
            recMenSuit.getElementsByClassName("rec-price")[0].innerHTML= prodPrice + "ILS";
            break;
        }}
});

//Women's Suit
womenSuitsDocRef.get().then( snap => {
    let data = snap.data();
    console.log(snap.id + " inside the then");
    for (let i in data){
        console.log(snap.id + " inside the for");
        if (data[i].recommend === true){
            console.log(snap.id + " inside the if");
            let prodName = data[i].productName;
            let prodImg = data[i].img;
            let prodPrice = data[i].price;
            console.log(prodImg);
            recWomenSuit.getElementsByClassName("rec-title")[0].innerHTML= prodName;
            recWomenSuit.getElementsByClassName("rec-img")[0].innerHTML= "<img class='rec-img' src=\'"+prodImg+"\'>";
            recWomenSuit.getElementsByClassName("rec-price")[0].innerHTML= prodPrice + "ILS";
            break;
        }}
});

//Accessories
accessoriesDocRef.get().then( snap => {
    let data = snap.data();
    console.log(snap.id + " inside the then");
    for (let i in data){
        console.log(snap.id + " inside the for");
        if (data[i].recommend === true){
            console.log(snap.id + " inside the if");
            let prodName = data[i].productName;
            let prodImg = data[i].img;
            let prodPrice = data[i].price;
            console.log(prodImg);
            recAccess.getElementsByClassName("rec-title")[0].innerHTML= prodName;
            recAccess.getElementsByClassName("rec-img")[0].innerHTML= "<img class='rec-img' src=\'"+prodImg+"\'>";
            recAccess.getElementsByClassName("rec-price")[0].innerHTML= prodPrice + "ILS";
            break;
        }}
});

/***********************************THIS HELPS ME **************************************/

// stockRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id)
//         try {
//             for (let i=1 ; i<=3 ; i++){
//                 console.log(doc.data()[i].recommend);
//                 if (doc.data()[i].recommend === true){
//                     console.log(doc.data()[i].productName)
//                 }
//             }
//         } catch(error) {
//             console.log("document number doesn't exist")
//         };
//     });
// });

// boardsDocRef.get().then((doc) => {
//     if(doc.data().boardOne.recommend === true){
//         console.log("I am number 1!")
//     } else {
//         console.log ("I failed")
//     }
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

// stockRef.where("recommend", "==", true)
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

// stockRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data()["1"].recommend);
//     });
// });

// stockRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         for (let i=0 ; i<=1 ; i++){
//             console.log(doc.data()[i].recommend);
//         }
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data()["1"].recommend);
//     });
// });