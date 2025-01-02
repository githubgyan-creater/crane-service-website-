window.onload = function () {
    setTimeout(function () {
        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 2000); // Delay hiding the preloader for 3 seconds
};

let btn = document.querySelector('button')
let content = document.querySelector(".chatbot-logo")
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)

    text_speak.rate = 1;
    text_speak.pitch = 2;
    text_speak.volume = 1;
    text_speak.lang = "en-UK";

    window.speechSynthesis.speak(text_speak)

}
function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    console.log(hours)
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir,I am robo, how can i help you")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir,I am robo,how can i help you")
    }
    else {
        speak("Good Evening Sir,I am robo, how can i help you")
    }

}
window.addEventListener('load', () => {
    wishMe()
})
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    console.log(event)
    takeCommand(transcript)
}
btn.addEventListener("click", () => {
    recognition.start()

})

function takeCommand(message) {
    // Convert the message to lowercase to make it case-insensitive
    btn.style.display = "flex";
    message = message.toLowerCase();

    // Check if the message contains any of the greetings
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        // Call the speak function to respond
        speak("Hello sir, what can I help you with?");
    }
    // Add more conditions if needed for other types of commands or messages
    else if (message.includes("who are you") || message.includes("what is this")) {
        speak("i am an  AI assistent created by swarnim");
    }
    else if (message.includes("how do i book a crane service")) {
        speak("To book our services,you can visit our services section");
    }
    else if (message.includes("raise a query")) {
        speak("our team will connect with you!please fill  out  this form");
        window.open(" http://127.0.0.1:3000/index3.html", "_blank")
    }
    else if (message.includes("register") || message.includes("sign up") || message.includes("login")) {
        speak("we are redirecting you to our login and register page");
        window.open("", "_blank")
    }
    else if (message.includes("BR crane services") || message.includes("crane services")) {
        speak("We are the best company of 24 Hour towing Services, towing Services, Towing Platform Services, Cranes on Hire Services, Crane Services, Hydraulic Cranes on Hire Services and Forklift Cranes on Hire Services in Gurugram Haryana India. B.R. Crane Services is located in Gurugram(HR). It is specifically due to complete understanding of the market operations and..");
        window.open()
    }
    else if (message.includes("gallery")) {
        speak("see our latest photos of cranes");
        window.open("", "_blank")
    }
    else {
        speak("for further assistance you can call to our customer care number 8298806601")
    }
}

const apiKey = 'AIzaSyBZrS5LkAXAqzgVYMJQQMYOoWgYCHHZTU';
var myLatLng = { lat: 26.8467, lng: 80.9642 };
var mapOptions = {
    center: myLatLng,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);