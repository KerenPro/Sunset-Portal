//Firebase Reference
const db = firebase.firestore();

//References to DB
const ClassesRef = db.collection("Classes");

//Using Date
const today = new Date();

//Back to Homepage
const redirectToHomepage = () => {
    window.location.href = "../index.html";
};

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    //Variables
    const surf = document.getElementById("surf");
    const sap = document.getElementById("sap");
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const id = document.getElementById("id").value;
    const phoneNumber = document.getElementById("phoneNum").value;
    const trueHealthy = document.getElementById("tHealthy");
    const falseHealthy = document.getElementById("fHealthy");
    const issues = document.getElementById("issues").value;
    const date = document.getElementById("date").value;
    const classAddedDateTime = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} ; ${today.getHours()}:${today.getMinutes()}`;
    const privateClass = document.getElementById("private");
    const groupClass = document.getElementById("group");
    const numOfParticipants = document.getElementById("numOfParticipants").value;

    let isHealthy;
    let classType;
    let classParticipants;

    if (surf.checked) {
        classType = "גלישה";
        console.log("surf is chosen");
    } else if (sap.checked) {
        classType = "סאפ";
        console.log("sap is chosen");
    }


    if (trueHealthy.checked) {
        isHealthy = true;
        console.log(isHealthy);
    } else if (falseHealthy.checked) {
        isHealthy = false;
        console.log(isHealthy);
    }

    if (privateClass.checked) {
        classParticipants = "פרטי"
    } else if (groupClass.checked) {
        classParticipants = "קבוצתי"
    }

    console.log(date);
    //Finalize order object
    const newClass = {
        classType: classType,
        classDateTime: firebase.firestore.Timestamp.fromDate(new Date(date)),
        firstName: firstName,
        lastName: lastName,
        id: id,
        phoneNumber: phoneNumber,
        isHealthy: isHealthy,
        knownIssues: issues,
        classAddedDateTime: classAddedDateTime,
        classParticipants: classParticipants,
        numOfParticipants: numOfParticipants
    };

    ClassesRef
        .add(newClass)
        .then((docRef) => {
            alert("השיעור נוסף בהצלחה");
            //redirectToHomepage();
        });
    return false;
});
