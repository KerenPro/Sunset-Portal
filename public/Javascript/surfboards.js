 
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

//google calendar API//

	







 
 