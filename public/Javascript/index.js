console.log("got here");
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

var data;
const xhr = new XMLHttpRequest();
xhr.open('GET',"https://api.openweathermap.org/data/2.5/weather?lat=32.01182212930542&lon=34.73723335988008&appid=f1ac321039f30e194beb02dadb751b4c&lang=he&units=metric");
xhr.send();
xhr.onload = () =>{
    data = JSON.parse(xhr.response);
    console.log(data);

    let sRise = convertTime(data.sys.sunrise);
    let sSet = convertTime(data.sys.sunset);
    let windDir = convertWindDir(data.wind.deg);

    let ms = data.wind.speed;
    let kph = ms* 3.6;
    kph = (Math.round(kph*100)/100).toFixed(2);

    
    document.getElementById("temp").innerHTML ="כעת: " + data.main.temp;
    document.getElementById("feelsLike").innerHTML = "מרגיש כמו: " + data.main.feels_like;
    document.getElementById("windSpeed").innerHTML = windDir + " " + kph + " " + "קמ״ש"
    document.getElementById("sunrise").innerHTML ="זריחה:" + " " + sRise;
    document.getElementById("sunset").innerHTML = "שקיעה:" + " " + sSet;
    document.getElementById("humidity").innerHTML = "לחות: " + data.main.humidity + "%";
    
};

function convertTime(unixTime){
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
}

function convertWindDir (deg){
    let compass = ["צ׳", "צ׳-צ׳-מע׳","צ׳-מע׳", "מע׳-צ׳-מע׳", "מע׳", "מע׳-ד׳-מע׳", "ד׳-מע׳", "ד׳-ד׳-מע׳", "ד׳", "ד׳-ד׳-מז׳", "ד׳-מז׳", "מז׳-ד׳-מז׳", "מז׳", "מז׳-צ׳-מז׳", "צ׳-מז׳"]
    let index = Math.round((deg % 360)/ 22.5)
    return compass[index];
}





 
 