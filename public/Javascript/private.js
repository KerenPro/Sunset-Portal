var classes = [{id: 1, 'time': "1/9"}, {id: 2, time: "3/9"}];
var rentals = [];
var currentlyDeletingId;
var currentlyUpdatingId;

// Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        let firebaseConfig = {
            apiKey: "AIzaSyBsLq2Z1CMwKmEg0K47n9yCjnPeNhz4lqA",
            authDomain: "sunset-portal.firebaseapp.com",
            projectId: "sunset-portal",
            storageBucket: "sunset-portal.appspot.com",
            messagingSenderId: "861523328352",
            appId: "1:861523328352:web:5319424c8a9ca6778ef205",
            measurementId: "G-S8K9RDWCP8",
            databaseURL: "https://sunset-portal-default-rtdb.europe-west1.firebasedatabase.app/"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

//Firebase Reference
const db = firebase.firestore();


async function getClasses() {
    const classesRef = await db.collection("classes").get();
    return classesRef.docs;


}

async function getRentals() {
    //References to DB
    const ordersRef = await db.collection("Orders").get();
    return ordersRef.docs;
}


getRentals().then(newRentals => buildRentals(newRentals));

var classesUl = document.getElementById("classes");
for (var lesson in classes) {
    
}



var shopM = document.getElementById("shopM");
var shopModal = document.getElementById("shopModal");
var span1 = document.getElementsByClassName("close")[1];
    
var cancel_classM = document.getElementById("cancelModal");
var span2 = document.getElementsByClassName ("close") [2];

var update_classM = document.getElementById("updateModal");
var closeUpdate = document.getElementById("closeUpdate");

function buildRentals(newRentals) {
    
    shopM.onclick = function() {
        shopModal.style.display = "block";
    }
    span1.onclick = function(event) {
        shopModal.style.display = "none";
        event.stopPropagation();
    }

    cancel_classM.onclick = function (event) {
        swal({
            title: "האם תרצה לקבוע השכרה חדשה?",
            text: "בלחיצה על לא, הזמנתך תבוטל",
            type: "question",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            cancelButtonText: "לא",
            confirmButtonText: "כן",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm) {
            if (isConfirm) {
              swal("Deleted!", "Your imaginary file has been deleted.", "success");
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
              saveCancellation();
            }
          });
        
        event.stopPropagation();
    }
    
    span2.onclick = function (event) {
        cancel_classM.style.display = "none";
        event.stopPropagation();
    }

    update_classM.onclick = function (event) {
        event.stopPropagation();
    }

    closeUpdate.onclick = function (event) {
        update_classM.style.display = "none";
        event.stopPropagation();
    }

    console.log(newRentals);
    rentals = newRentals;
var rentalsTable = document.getElementById("rentals");
rentals.forEach(rental => {
    rentalData = rental.data();
    var tr = document.createElement("tr");
    var numberTd = document.createElement("td");
    var numberText = document.createTextNode("#");
    numberTd.appendChild(numberText);
    tr.appendChild(numberTd);
    var dateTd = document.createElement("td");
    var dateText = document.createTextNode(rentalData['date'] ? rentalData['date'].toDate().toLocaleDateString("en-UK") : null);
    dateTd.appendChild(dateText);
    tr.appendChild(dateTd);
    var timeTd = document.createElement("td");
    var timeText = document.createTextNode(rentalData['date'] ? rentalData['date'].toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).split(" ")[0] : null );
    timeTd.appendChild(timeText);
    tr.appendChild(timeTd);
    var itemTd = document.createElement("td");
    var itemText = document.createTextNode(rentalData.itemTypes);
    itemTd.appendChild(itemText);
    tr.appendChild(itemTd);
    var buttonTd = document.createElement("td");
    var changeButton = document.createElement("button");
    changeButton.setAttribute("class", "update");
    var changeButtonText = document.createTextNode("עדכון");
    changeButton.appendChild(changeButtonText);
    changeButton.onclick = function (event) {
        shopModal.style.display = "none";
        update_classM.style.display = "block";
        currentlyUpdatingId = rental.id;
        event.stopPropagation();
    }
    buttonTd.appendChild(changeButton);
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel_bu");
    cancelButton.setAttribute("class", "cancel");
    var cancelButtonText = document.createTextNode("ביטול");
    cancelButton.appendChild(cancelButtonText);
    cancelButton.onclick = function(event) {
        shopModal.style.display = "none";
        cancel_classM.style.display = "block";
        currentlyDeletingId = rental.id;
        event.stopPropagation();
    }
    buttonTd.appendChild(cancelButton);
    tr.appendChild(buttonTd);
    rentalsTable.appendChild(tr);
});

var classM = document.getElementById("classM");
var classesModal = document.getElementById("classModal");
var span = document.getElementById("classClose");

classM.onclick = function() {
    classesModal.style.display = "block";
}

span.onclick = function(event) {
    classesModal.style.display = "none";
    event.stopPropagation();
}

window.onclick = function(event) {
    if(event.target == classesModal) {
        classesModal.style.display = "none";
    }

    if(event.target == shopModal) {
        shopModal.style.display = "none";
    }
}
}

function saveCancellation() {
    //delete in db
    console.log(currentlyDeletingId);
    cancel_classM.style.display = "none";
}

function saveUpdate() {
    //save in db
    console.log(currentlyUpdatingId);
    update_classM.style.display = "none";
}