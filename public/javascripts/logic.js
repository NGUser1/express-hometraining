

//console.log(sessionStorage.getItem("Trainingszeit"));
//console.log(sessionStorage.getItem("Pause"));
//console.log(sessionStorage.getItem("Durchgaenge"));

//zusatzeliche pruefeung der maximal werte da dies von aender.html gesendet werden kann
if (sessionStorage.getItem("Trainingszeit") > 600 || sessionStorage.getItem("Pause") > 600 || sessionStorage.getItem("Durchgaenge") > 60) {
	//sessionStorage.clear(); 
	sessionStorage.removeItem("Trainingszeit");
	sessionStorage.removeItem("Pause");
	sessionStorage.removeItem("Durchgaenge");
	
}

if (sessionStorage.getItem("Trainingszeit") == null || sessionStorage.getItem("Pause") == null || sessionStorage.getItem("Durchgaenge") == null) {
	var pause = 60; //sekunden
	var Zeit = 60; //sekunden
	var durchgang = 1; //druchgaenge
} else {
	var Zeit = sessionStorage.getItem("Trainingszeit");
	var pause = sessionStorage.getItem("Pause");
	var durchgang = sessionStorage.getItem("Durchgaenge");
}

var Startzeit = Zeit;
var StartPause = pause;
var Startdurchgaenge = durchgang;

const mySound = document.getElementById("sound");
const winSound = document.getElementById("win-sound");
//var uebungen = ["Liegestütze", "Situps", "Kniebeugen", "Schattenboxen", "Seilspringen"];
var uebungen = [];

//beim erst aufruf der website standard werte befuellen
if (sessionStorage.getItem("uebung1") == null && sessionStorage.getItem("uebung2") == null && sessionStorage.getItem("uebung3") == null && sessionStorage.getItem("uebung4") == null && sessionStorage.getItem("uebung5") == null) {
sessionStorage.setItem("uebung1","Liegestütze");
sessionStorage.setItem("uebung2","Situps");
sessionStorage.setItem("uebung3","Kniebeugen");
sessionStorage.setItem("uebung4","Schattenboxen");
sessionStorage.setItem("uebung5","Seilspringen");
}

getaktUebungen();

//var pause = 60;
//var durchgang = 1;
//var Zeit = 60; 
var Uebungsauswahl = 0; //0 1 2 3 4

var myVar;
var myVardisplay; // test
var counter = 0;

function starttraining() {
	console.log("START TRAINING");
	//document.getElementById("Timeleft").innerHTML = Zeit;
	//document.getElementById("Anweisung").innerHTML = uebungen[Uebungsauswahl];
	mySound.play();
	
	//myTimer(); 
	myVardisplay = setInterval(myTimer, 500); //Test
	//myVar = setInterval(myTimer, 1000);
	myVar = setInterval(calctime, 1000);
 }
function myTimer() {
	document.getElementById("Timeleft").innerHTML = Zeit;
	document.getElementById("Anweisung").innerHTML = uebungen[Uebungsauswahl]; //uebungen[count]
	//calctime(); tets
}
function calctime() {
	Zeit--;
	if (Zeit == 0 && Uebungsauswahl == (uebungen.length - 1)) {
		counter++;
		console.log(counter);
		//mySound.play();
		clearInterval(myVar);
		if (counter != durchgang) {
			//Test ---
			clearInterval(myVardisplay);
			//--
			mySound.play();
			document.getElementById("Timeleft").innerHTML = pause;
			document.getElementById("Anweisung").innerHTML ="PAUSE";
			myVar = setInterval(Pause, 1000);
			//Pause();
		} else {
			//clearInterval(myVar);
			winSound.play();
			clearInterval(myVardisplay); // Test
			console.log("ENDE TRAINING");
			//location.reload();
			document.getElementById("Timeleft").innerHTML = "FERTIG";
			document.getElementById("Anweisung").innerHTML = "";
			reset();
		}
	} else if (Zeit == 0) {
		//console.log(uebungen[Uebungsauswahl]);
		//console.log(" vorbei");
		//console.log("Uebung nummer" + Uebungsauswahl);
		mySound.play();
		Zeit = Startzeit; //startzeit da user vielelciht startzeit geaendert hat
		Uebungsauswahl++;
	}
}

function Pause() {
	pause--;
	document.getElementById("Timeleft").innerHTML = pause;
	document.getElementById("Anweisung").innerHTML ="PAUSE";
	if (pause == 0) {
		console.log("PAUSE vorbei");
		mySound.play();
		Zeit = Startzeit;
		Uebungsauswahl = 0;
		clearInterval(myVar);
		pause = StartPause; //fuer den naechsten durhcgang pause zuruecksetzen
		starttraining();
	}
}

function reset() {
	Zeit = Startzeit;
	pause = StartPause;
	durchgang = Startdurchgaenge;
	counter = 0;
	Uebungsauswahl = 0;
}

//vorm start ausfurhen falls auf aender.html eintrage entfernt wurden
function getaktUebungen() {
	   var uebungenMap = new Map();       
       var count = 1;       
       var tmpliste = [];
       while (true) {
          var temp = "uebung" + count;
          if (sessionStorage.getItem(temp) == null) {
			  break;	  
		  } else {
			  //falls einer der ertsen 5 eintrage geloscht wurde
			  if (sessionStorage.getItem(temp) == "delete") {
				  count++;
			  } else  {
				  uebungenMap.set(temp, sessionStorage.getItem(temp));
				  tmpliste.push(sessionStorage.getItem(temp));
				  count++;
			}
		}
        }
        
        uebungen = tmpliste;
        //console.log(uebungen.length);
        
       }
