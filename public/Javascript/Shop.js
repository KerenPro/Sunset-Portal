let db = firebase.firestore();
let stockRef = db.collection("Stock");
let boardsDocRef = stockRef.doc("Boards");

boardsDocRef.get().then((doc) => {
    if(doc.data().1
    .recommend === true){
        console.log("I am number 1!")
    } else {
        console.log ("I failed")
    }
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

// let staffRecommendations = document.getElementById("recommendations");
// boardsDocRef.get().then((doc) => {
    
// }

// )