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
    const classesRef = await db.collection("Classes").get();
    return classesRef.docs;
}

async function getRentals() {
    //References to DB
    var ordersRef = await db.collection("Orders").get();
    return ordersRef.docs;
}

getClasses().then(newClasses => buildClasses(newClasses));

var classesUl = document.getElementById("classes");

var shopM = document.getElementById("shopM");
var shopModal = document.getElementById("shopModal");
var classesModal = document.getElementById("classModal");
var closeRentalModal = document.getElementById("closeRentalModal");
var closeClassModal = document.getElementById("closeClassModal");

var updateSurfRentalModal = document.getElementById("updateSurfRentalModal");
var updateSupRentalModal = document.getElementById("updateSupRentalModal");
var updateClothingRentalModal = document.getElementById("updateClothingRentalModal");
var closeSurfRentalUpdate = document.getElementById("closeSurfRentalUpdate");
var closeSupRentalUpdate = document.getElementById("closeSupRentalUpdate");
var closeClothingRentalUpdate = document.getElementById("closeClothingRentalUpdate");
var closeClassUpdate = document.getElementById("closeClassUpdate");

function buildClasses(newClasses) {
    getRentals().then(newRentals => buildRentals(newRentals));

    updateClassModal.onclick = function (event) {
        event.stopPropagation();
    }

    closeClassUpdate.onclick = function (event) {
        updateClassModal.style.display = "none";
        event.stopPropagation();
    }

    classes = newClasses;
var classTable = document.getElementById("classes");
classes.forEach(lesson => {
    classData = lesson.data();
    var tr = document.createElement("tr");
    var numberTd = document.createElement("td");
    var numberText = document.createTextNode("#");
    numberTd.appendChild(numberText);
    tr.appendChild(numberTd);
    var dateTd = document.createElement("td");
    var dateText = document.createTextNode(classData['classDateTime'] ? classData['classDateTime'].toDate().toLocaleDateString("he-IL") : null);
    dateTd.appendChild(dateText);
    tr.appendChild(dateTd);
    var timeTd = document.createElement("td");
    var timeText = document.createTextNode(classData['classDateTime'] ? classData['classDateTime'].toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}).split(" ")[0] : null );
    timeTd.appendChild(timeText);
    tr.appendChild(timeTd);
    var itemTd = document.createElement("td");
    var itemText = document.createTextNode(classData.classType);
    itemTd.appendChild(itemText);
    tr.appendChild(itemTd);
    var groupTd = document.createElement("td");
    var groupText = document.createTextNode(classData.classParticipants);
    groupTd.appendChild(groupText);
    tr.appendChild(groupTd);
    var amountTd = document.createElement("td");
    var amountText = document.createTextNode(classData.numOfParticipants);
    amountTd.appendChild(amountText);
    tr.appendChild(amountTd);
    var buttonTd = document.createElement("td");
    var changeButton = document.createElement("button");
    changeButton.setAttribute("class", "update");
    var changeButtonText = document.createTextNode("עדכון");
    changeButton.appendChild(changeButtonText);
    changeButton.onclick = function (event) {
        updateClassModal.setAttribute("classId",lesson.id);
        updateClassModal.setAttribute("classEventId",classData.eventId);
        colorClass(classData.classType)
        classesModal.style.display = "none";
        updateClassModal.style.display = "block";
        event.stopPropagation();
    }
    buttonTd.appendChild(changeButton);
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel_bu");
    cancelButton.setAttribute("class", "cancel");
    var cancelButtonText = document.createTextNode("ביטול");
    cancelButton.appendChild(cancelButtonText);
    cancelButton.onclick = function(event) {
        db.collection("Classes").doc(lesson.id).delete();
        if(classData.eventId != "") 
        {
            var resource ={};
            deleteRequest(resource, classData.eventId);
        }
        //add toast deleted class successfully
        swal("השיעור בוטל בהצלחה", "", "success");

        classTable.innerHTML = '';
        getClasses().then(newClasses => buildClasses(newClasses));
    }
    buttonTd.appendChild(cancelButton);
    tr.appendChild(buttonTd);
    classTable.appendChild(tr);
});
}

function openChangeModal(itemTypes,rentalID, eventId) {
    return () => { shopModal.style.display = "none";
        if (itemTypes[0].includes("גלשן") || (itemTypes[1] && itemTypes[1].includes("גלשן"))){
            updateSurfRentalModal.style.display="block";
            updateSurfRentalModal.setAttribute("rentalID",rentalID);
            updateSurfRentalModal.setAttribute("eventID",eventId);
        } else if ((itemTypes[0].includes("סאפ") || (itemTypes[1] && itemTypes[1].includes("סאפ")))){
            updateSupRentalModal.style.display = "block";
            updateSupRentalModal.setAttribute("rentalID",rentalID);
            updateSupRentalModal.setAttribute("eventID",eventId);
        } else{
            updateClothingRentalModal.style.display = "block";
            updateClothingRentalModal.setAttribute("rentalID",rentalID);
            updateClothingRentalModal.setAttribute("eventID",eventId);
        }
    }
    }


function buildRentals(newRentals) {
    
    shopM.onclick = function() {
        shopModal.style.display = "block";
    }
    closeRentalModal.onclick = function(event) {
        shopModal.style.display = "none";
        event.stopPropagation();
    }
    

    updateSurfRentalModal.onclick = function (event) {
        event.stopPropagation();
    }

    updateSupRentalModal.onclick = function (event) {
        event.stopPropagation();
    }

    updateClothingRentalModal.onclick = function (event) {
        event.stopPropagation();
    }

    closeSurfRentalUpdate.onclick = function (event) {
        updateSurfRentalModal.style.display = "none";
        event.stopPropagation();
    }

    closeSupRentalUpdate.onclick = function (event) {
        updateSupRentalModal.style.display = "none";
        event.stopPropagation();
    }

    closeClothingRentalUpdate.onclick = function (event) {
        updateClothingRentalModal.style.display = "none";
        event.stopPropagation();
    }

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
    var dateText = document.createTextNode(rentalData['orderDate'] ? rentalData['orderDate'].toDate().toLocaleDateString("he-IL") : null);
    dateTd.appendChild(dateText);
    tr.appendChild(dateTd);
    var timeTd = document.createElement("td");
    var timeText = document.createTextNode(rentalData['orderDate'] ? rentalData['orderDate'].toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}).split(" ")[0] : null );
    timeTd.appendChild(timeText);
    tr.appendChild(timeTd);
    var itemTd = document.createElement("td");
    var itemText = document.createTextNode(rentalData.itemTypes);
    itemTd.appendChild(itemText);
    tr.appendChild(itemTd);
    var buttonTd = document.createElement("td");
    var changeButton = document.createElement("button");
    changeButton.setAttribute("id", "changeRental"+rental.id)
    changeButton.setAttribute("class", "update");
    var changeButtonText = document.createTextNode("עדכון");
    changeButton.appendChild(changeButtonText);
    changeButton.onclick = openChangeModal(rentalData.itemTypes,rental.id,rentalData.eventId);
    buttonTd.appendChild(changeButton);
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel_bu");
    cancelButton.setAttribute("class", "cancel");
    var cancelButtonText = document.createTextNode("ביטול");
    cancelButton.appendChild(cancelButtonText);
    cancelButton.onclick = function(event) {
        db.collection("Orders").doc(rental.id).delete();
        if(rentalData.eventId != "") 
        {
            var resource ={};
            deleteRequest(resource,rentalData.eventId);
        }
        swal("ההשכרה בוטלה בהצלחה", "", "success");
        rentalsTable.innerHTML = '';
        getRentals().then(newRentals => buildRentals(newRentals));
    }
    buttonTd.appendChild(cancelButton);
    tr.appendChild(buttonTd);
    rentalsTable.appendChild(tr);

});



var classM = document.getElementById("classM");

classM.onclick = function() {
    classesModal.style.display = "block";
}

closeClassModal.onclick = function(event) {
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
}

function cancelClass(id) {

}

 
 //send request to WHEATHER API//
 function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      myFunction(this);
      color();
      colorSup();
      colorCloth();
    }
    xhttp.open("GET", "https://api.worldweatheronline.com/premium/v1/marine.ashx?key=834d1631abe74c1bb86150430212508&format=xml&q=32.017136,34.745441&lang=he");
    xhttp.send();
  }
  //sort in table 2 variebls from XML (from API) - waves height and date//
  function myFunction(xml) {
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("weather");
    let table="<tr><th>תאריך</th><th>גובה הגלים</th></tr>";
    for (let i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
      x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("swellHeight_m")[0].childNodes[0].nodeValue +
      "</td></tr>";
    }
  
    document.getElementById("demo").innerHTML = table;
    document.getElementById("demoSup").innerHTML = table;
    document.getElementById("demoCloth").innerHTML = table;
    document.getElementById("demoClass").innerHTML = table;
  }
  //change date cell color in table to green due to condition of waves height and create an option in "date" select element//
  function color(){
     var tds = document.getElementById('demo').getElementsByTagName('td');
     var selectList = document.getElementById("taarih-azmana");
     
     for(i=0;i<tds.length;i++) {
      if(tds[i].innerHTML >0.5 && tds[i].innerHTML<1){
          tds[i-1].style.backgroundColor ="#90EE90";
          var option = document.createElement("option");
          option.value = tds[i-1].innerHTML;
          option.text = tds[i-1].innerHTML;
          selectList.add(option);
       }
     }
     }

     function colorClass(eventType){
        var tds = document.getElementById('demoClass').getElementsByTagName('td');
        var selectList = document.getElementById("taarih-azmanaClass");
        
        if (eventType.includes("גלישה")){
            for(i=0;i<tds.length;i++) {
                if(tds[i].innerHTML >0.5 && tds[i].innerHTML<1){
                    tds[i-1].style.backgroundColor ="#90EE90";
                    var option = document.createElement("option");
                    option.value = tds[i-1].innerHTML;
                    option.text = tds[i-1].innerHTML;
                    selectList.add(option);
                 }
               }
        }else {
            for (i = 0; i < tds.length; i++) {
                if (tds[i].innerHTML <= 0.5) {
                  tds[i - 1].style.backgroundColor = "#90EE90";
                  var option = document.createElement("option");
                  option.value = tds[i - 1].innerHTML;
                  option.text = tds[i - 1].innerHTML;
                  selectList.add(option);
                }
              }
        }

        }

     function colorSup(){
        var tds = document.getElementById('demoSup').getElementsByTagName('td');
        var selectList = document.getElementById("taarih-azmanaSup");
        
        for (i = 0; i < tds.length; i++) {
            if (tds[i].innerHTML <= 0.5) {
              tds[i - 1].style.backgroundColor = "#90EE90";
              var option = document.createElement("option");
              option.value = tds[i - 1].innerHTML;
              option.text = tds[i - 1].innerHTML;
              selectList.add(option);
            }
          }
        }

        function colorCloth(){
            var tds = document.getElementById('demoCloth').getElementsByTagName('td');
            var selectList = document.getElementById("taarih-azmanaCloth");
            
            for (i = 0; i < tds.length; i++) {
                if (tds[i].innerHTML > 0) {
                  var option = document.createElement("option");
                  option.value = tds[i - 1].innerHTML;
                  option.text = tds[i - 1].innerHTML;
                  selectList.add(option);
                }
              }
            }
     

     //connect to Google Calendar API with credantials(api key and client ID)//
      //API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
    
      var apiKey = 'AIzaSyB4cxbY2LD7KADlNEX8Bd1NWOPQWqgZasQ';

      //  client ID for a web application from the Google Developer Console.
      // In your Developer Console project, add a JavaScript origin that corresponds to the domain
      // where you will be running the script.
      var clientId = "121390106151-e6s4een21lsq4f9jdj49p2h6bc0ng7sj.apps.googleusercontent.com"
      var scopes = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';
      var calanderId = "c3Vuc2V0c3VyZnBvcnRhbEBnbWFpbC5jb20";
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // The Calendar entry to create//
	  

      function handleClientLoad() {
        gapi.load('client', initClient);
      }

      function initClient() {
        gapi.client.init({
          apiKey: apiKey,
          clientId: clientId,
          discoveryDocs: DISCOVERY_DOCS,
          scope: scopes
        }).then();
      }

      function signIn() {
        gapi.auth2.getAuthInstance().signIn();
      }
	  
		//API request//
      function makeRequest(resource, eventID) {
        gapi.auth2
        .getAuthInstance()
        .signIn({ prompt: "select_account" })
        .then((res) => {
          var event = gapi.client.calendar.events.get({"calendarId": 'primary', "eventId": eventID});
          var request = gapi.client.calendar.events.patch({
                'calendarId': 'primary',
                'eventId': eventID,
                'resource': resource
            });
            request.execute(function (event) {
                console.log(event);
            });
        })
        .catch((res) => {
          console.log("google login failed");
          console.log(res);
        });
    }

    function deleteRequest(resource, eventID) {
        gapi.auth2
        .getAuthInstance()
        .signIn({ prompt: "select_account" })
        .then((res) => {
          var event = gapi.client.calendar.events.get({"calendarId": 'primary', "eventId": eventID});
          var request = gapi.client.calendar.events.delete({
                'calendarId': 'primary',
                'eventId': eventID
            });
            request.execute(function (event) {
                console.log(event);
            });
        })
        .catch((res) => {
          console.log("google login failed");
          console.log(res);
        });
    }

      $(document).ready(function () {
        loadDoc();
            });

            function saveClassUpdate()
            {
                updateClassModal.style.display = "none";
                var classId = updateClassModal.getAttribute("classId");
                console.log(classId);
                var subOne = (parseInt(document.getElementById("fromClass").value) - 1).toString();
                console.log(subOne);
                if(subOne<=9)
                    var supportDate = document.getElementById("taarih-azmanaClass").value+"T0"+subOne+":00:00";
                else
                    var supportDate = document.getElementById("taarih-azmanaClass").value+"T"+subOne+":00:00";
                console.log(supportDate);
                var timeStamp = Date.parse(supportDate);
                console.log(timeStamp);
                var changeDate = firebase.firestore.Timestamp.fromDate(new Date(timeStamp));
                console.log(changeDate);
                db.collection("Classes").doc(classId).update({classDateTime:changeDate});

                if(eventID != "")
                {
                    console.log("ClassChanges!")
                    var subOne = (parseInt(document.getElementById("fromClass").value) - 1).toString();
                    var startTime = document.getElementById("taarih-azmanaClass").value+"T"+subOne+":00:00.000+03:00";
                    var endTime = document.getElementById("taarih-azmanaClass").value+"T"+document.getElementById("fromClass").value+":00:00.000+03:00";
                    var resource = {
                        end: { dateTime: endTime },
                        start: { dateTime: startTime },
                      };
                    makeRequest(resource,eventID);
                }
                

                var classesUl = document.getElementById("classes");
                classesUl.innerHTML = '';
                swal("השיעור עודכן בהצלחה", "", "success");
                getClasses().then(newClasses => buildClasses(newClasses));
                classesModal.style.display = "block";

            }
            function saveSurfUpdate() {
                updateSurfRentalModal.style.display = "none";
                saveUpdate(updateSurfRentalModal.getAttribute("rentalID"), updateSurfRentalModal.getAttribute("eventID"),"");
            }

            function saveSupUpdate() {
                updateSupRentalModal.style.display = "none";
                saveUpdate(updateSupRentalModal.getAttribute("rentalID"),updateSupRentalModal.getAttribute("eventID"),"Sup");
            }

            function saveClothingUpdate() {
                updateClothingRentalModal.style.display = "none";
                saveUpdate(updateClothingRentalModal.getAttribute("rentalID"),updateClothingRentalModal.getAttribute("eventID"),"Cloth");
            }
          

            function saveUpdate (rentalID, eventID,eventType) {
                //update in DB
                var timeStamp = toTimeStamp(eventType);
                //console.log(timeStamp);
                var changeDate = firebase.firestore.Timestamp.fromDate(new Date(timeStamp));
                db.collection("Orders").doc(rentalID).update({orderDate:changeDate});
                
                //Update in google calander
                if(eventID != "")
                {
                    console.log("changes!")
                    var subOne = (parseInt(document.getElementById("from"+eventType).value) - 1).toString();
                    var startTime = document.getElementById("taarih-azmana"+eventType).value+"T"+subOne+":00:00.000+03:00";
                    var endTime = document.getElementById("taarih-azmana"+eventType).value+"T"+document.getElementById("from"+eventType).value+":00:00.000+03:00";
                    var resource = {
                        end: { dateTime: endTime },
                        start: { dateTime: startTime },
                      };
                    makeRequest(resource,eventID);
                }

                
                // update screen
                var rentalsTable = document.getElementById("rentals");
                rentalsTable.innerHTML = '';
                swal("ההשכרה עודכנה בהצלחה", "", "success");
                getRentals().then(newRentals => buildRentals(newRentals));

                

            }
            function toTimeStamp(eventType){
                //console.log(eventType);
                //console.log(document.getElementById("from"+eventType).value);
                var subOne = (parseInt(document.getElementById("from"+eventType).value) - 1).toString();
                
                if(subOne<=9)
                    var supportDate = document.getElementById("taarih-azmana"+eventType).value+"T0"+subOne+":00:00";
                else
                    var supportDate = document.getElementById("taarih-azmana"+eventType).value+"T"+subOne+":00:00";
                
                //console.log(subOne);
                //var supportDate = document.getElementById("taarih-azmana").value+"T"+document.getElementById("from").value+":00:00";
                //var supportDate = document.getElementById("taarih-azmana"+eventType).value+"T0"+subOne+":00:00";
                //console.log(supportDate);
                var changeDate1 = Date.parse(supportDate);
                //console.log(changeDate1);
                return changeDate1;
            }


                     
                     
                        
                
            
