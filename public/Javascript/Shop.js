let db = firebase.firestore();
let stockRef = db.collection("Stock");
let boardsDocRef = stockRef.doc("Boards");

stockRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data()["1"].recommend);
    });
});

stockRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        for (let i=1 ; i<=2 ; i++){
            console.log(doc.data()[i].recommend);
        }
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data()["1"].recommend);
    });
});

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