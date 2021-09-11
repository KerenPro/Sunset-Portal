 //get current date and time//
	function getDate(){
    var now = new Date ();
    var day = now.getDate();
    var month = (now.getMonth()+1);
    var year = now.getFullYear();

    if(month.toString().length ==1){
        month= '0' + month;
    }
    if(day.toString().length == 1){
        day = "0" +day;
    }

    var date= day + "/" + month + "/" + year;
    return date;

}

function getTime(){
    var now= new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();

    if(hour.toString().length==1){
        hour = "0"+hour;
    }
    if(minute.toString().length==1){
        minute="0"+minute;
    }
    var time= hour + ":" + minute;
    return time;

}
document.getElementById("Date").innerHTML=getDate();
document.getElementById("Time").innerHTML=getTime();
  
 //send request to WHEATHER API//
function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    myFunction(this);
	color();
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
		//connect to Google Calendar API with credantials(api key and client ID)//
      //API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
    
      var apiKey = 'AIzaSyB4cxbY2LD7KADlNEX8Bd1NWOPQWqgZasQ';

      //  client ID for a web application from the Google Developer Console.
      // In your Developer Console project, add a JavaScript origin that corresponds to the domain
      // where you will be running the script.
      var clientId = '121390106151-e6s4een21lsq4f9jdj49p2h6bc0ng7sj.apps.googleusercontent.com';
      var scopes = 'https://www.googleapis.com/auth/calendar';

      // The Calendar entry to create//
	  

      function handleClientLoad() {
        gapi.load('client', initClient);
      }

      function initClient() {
        gapi.client.init({
          apiKey: apiKey,
          clientId: clientId,
          scope: scopes
        }).then();
      }

      function signIn() {
        gapi.auth2.getAuthInstance().signIn();
      }
	  
		//API request//
      function makeRequest(resource) {
		  gapi.auth2.getAuthInstance().signIn({prompt:'select_account'}).then((res)=>{
			console.log(res);
			gapi.client.request({
			  'path': '/calendar/v3/calendars/primary/events',
			  'method': 'POST',
			  'body': resource
			}).then(function(resp) {
				$('#event-id').val(""+ resp.result.id);
				console.log("from resp api");
				console.log(resp.result.id);
			  writeResponse(resp.result);
			});
		  }).catch((res)=>{
			 console.log("google login failed");
			 console.log(res); 
		  });
      }
		//This section code create a link to created event  //

      function writeResponse(response) {
        console.log(response);
        var creator = response.creator.email;
        var calendarEntry = response.htmlLink;
        var infoDiv = document.getElementById('info');
        var infoMsg = document.createElement('P');
        infoMsg.appendChild(document.createTextNode('האירוע ' +
            'נוצר בהצלחה ע"י ' + creator));
        infoDiv.appendChild(infoMsg);
        var entryLink = document.createElement('A');
        entryLink.href = calendarEntry;
        entryLink.appendChild(
            document.createTextNode('צפה באירוע שנוצר ביומנך'));
        infoDiv.appendChild(entryLink);
      }

   

$(document).ready(function () {
	loadDoc();
	//מה קורה לאחר לחיצה על "שלח הזמנה" //
	$('#order-form').on('submit', function (event) {
			event.preventDefault();
			
			//form validation//
			let isError = false;
			if($('#phone').val() === ""){
				$('#errphone').html("יש להזין מספר טלפון");
				isError = true;
				console.log ("inside Submit");
			}
			else{
				
				$('#errphone').html("");
			}
		
			if($('#fname').val() === ""){
				$('#errfname').html("יש להזין שם פרטי");
				isError = true;
			}
			else{
				
				$('#errfname').html("");
			}
			if($('#lname').val() === ""){
				$('#errlname').html("יש להזין שם משפחה");
				isError = true;
			}
			else{
				
				$('#errlname').html("");
			}
		    if($('#taz').val() === ""){
				$('#errtaz').html("יש להזין תעודת זהות");
				isError = true;
			}
			else{
				
				$('#errtaz').html("");
			}
			if($('#leida').val() === ""){
				$('#errleida').html("יש להזין תאריך לידה");
				isError = true;
			}
			else{
				
				$('#errleida').html("");
			}
			if($('#taarih-azmana').val() === ""){
				$('#errtaarih-azmana').html("יש לבחור תאריך השכרה");
				isError = true;
			}
			else{
				
				$('#errtaarih-azmana').html("");
			}
		
			if($('#from').val() === ""){
				$('#errfrom').html("יש לבחור שעת התחלה");
				isError = true;
			}
			else{
				
				$('#errfrom').html("");
			}	
				
			if($('#mida').val() === ""){
				$('#errmida').html("יש לבחור מידה");
				isError = true;
			}
			else{
				
				$('#errmida').html("");
			}
			
			if (!($('#azhara').prop('checked'))){
				$('#err-azhara').html("יש לסמן הצהרת בריאות");
				isError = true;
			}
			else{
				
				$('#err-azhara').html("");
			}			
					
			////	/////
				
			if(isError){
				
				return;
			}
			
			
			
			// אם הולדיציות תקינות תתבצע שליחת הזמנה ובנוסףב מידה והמשתמש יבחר שריון ביומן גוגל האישי שלו//
			
			// שריון ביומן//
			//יצירת משתנים לשליחה ליומן//
			///////////////////////
			//אם המשתמש סימן שהוא רוצה לשמור את האירוע ביון אז יתבצע //
			if($('#calendar').prop('checked') ){
			 console.log("writing to google calendar");
			  let summary = (" השכרה במועדון גלישה SUNSET , ברחוב בן גוריון 162 עבור: ") + " " +$('#parit').val() + " " + ("מידה:") + " " + $('#mida').val() ;
			  var supportDate   = document.getElementById("taarih-azmana");
			  var eventStart = document.getElementById("from");  
			  var eventEnd = ("0" + eventStart.value).slice(-2);
			  var start = supportDate.value +"T"+  eventStart.options[eventStart.selectedIndex].text+":00.000+03:00";
			  var end = supportDate.value +"T"+ eventEnd +":00:00.000+03:00";
			  var resource = {
				"summary": summary,
				"location":  "Bat Yam, Israel",
				"end": {"dateTime": end},
				 "start": {"dateTime": start }
			 
			  };
			  console.log('start: ' + start)
			  console.log('end: ' + end)
			  makeRequest(resource);
			}
			else{
				console.log("no calendar use");
			}
			
	
			  //prepare data to send //
			  const data = {};
			  const items=[];
			  
			  data.phoneNumber = $('#phone').val();
			  items.push( "גלשן גלים");
			  // check if customer wants also suite//
			//אם הוא לא מסומן "ללא חליפה" אז אני עושה : 
		     items.push( "הערך של הסלקטור");
			 data.itemTypes = items;
			 
			 data.calendarEventId= $('#event-id').val();
			 
			 
			 
			 //ajax request//
			 
			 
			$.ajax({
				url: "http://localhost:8000",
				method: "POST",
				data: data,
				dataType: "json",
				success: function (data) {
					alert ('ההזמנה התקבלה בהצלחה!')
					window.location.href = "";
				}	
				
			});
			 
		});
		
		
	
	
});






