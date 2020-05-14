//constant to hold score box and timer
const Score = document.querySelector("#Score");
const theTimer = document.querySelector(".timer");

//array to hold location divs
var textBoxes = [
    document.querySelector("#FirstLocation"),
    document.querySelector("#SecondLocation"),
    document.querySelector("#ThirdLocation"),
    document.querySelector("#FourthLocation"),
    document.querySelector("#FifthLocation")
];


//vars to check which question we are on
var answered = false;
//count the number of correct answers
var correct = 0;
//boolean to check if game over
var done = false;
//coutner for number of questions
var counter = 0;

//var to hold bounds for each area
var buildingBounds = [
    library = {
        north: 34.240393,
        south: 34.239476,
        east: -118.528614,
        west: -118.530047
    },
    jacaranda = {
        north: 34.242099,
        south: 34.241012,
        east: -118.527830,
        west: -118.529494
    },
    bookstore = {
        north: 34.237785,
        south: 34.236989,
        east: -118.527691,
        west: -118.528675
    },
    sierra = {
        north: 34.238458,
        south: 34.238114,
        east: -118.530042,
        west: -118.531402
    },
    usu = {
        north: 34.240457,
        south: 34.239193,
        east: -118.525238,
        west: -118.527272
    },
    bayramian = {
        north: 34.240699,
        south: 34.239920,
        east: -118.530174,
        west: -118.531474
    },
    sequoia = {
        north: 34.240795,
        south: 34.240135,
        east: -118.527589,
        west: -118.528445
    },
    matadome = {
        north: 34.242624,
        south: 34.241219,
        east: -118.525325,
        west: -118.527056
    },
    loEu = {
        north: 34.238758,
        south: 34.238160,
        east: -118.527625,
        west: -118.528819
    }
];

//list of locations for locations
var locations = [
    ['Oviat Library', 34.239808, -118.529318, 0],
    ['Jacaranda Hall', 34.241201, -118.529011, 0],
    ['Matador Bookstore', 34.237539, -118.528246, 0],
    ['Sierra Hall', 34.238245, -118.530695, 0],
    ['University Student Union', 34.239827, -119.526581, 0],
    ['Bayramian Hall', 34.240375, -118.530943, 0],
    ['Sequoia Hall', 34.240353, -118.528286, 0],
    ['Matadome', 34.241991, -118.256140, 0],
    ['Live Oak and Eucalyptus Hall', 34.238488, -118.528280, 0],
];

//array to hold the five locations used
var usedAreas = [];
//array to hold the bounds for the rectangles
var usedBounds = [];

var map;
var marker = [];
//initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.2392500, lng: -118.5274014 },
        zoom: 16.7,
        disableDefaultUI: true,
        mapTypeId: 'satellite',
        mapTypeControlOptions: {
            mapTypeIds: ['satellite'],
        },
        gestureHandling: 'none',
        zoomControl: false
    });

    var infowindow = new google.maps.InfoWindow();

    //coordiantes for campus outline
    var flightPlanCoordinates = [
        { lat: 34.235536, lng: -118.531727 },
        { lat: 34.242713, lng: -118.531760 },
        { lat: 34.242730, lng: -118.523292 },
        { lat: 34.235628, lng: -118.523172 },
        { lat: 34.235536, lng: -118.531727 }
    ];
    //parameters for outline of campus
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    //drawn the outline
    flightPath.setMap(map);

    //event for double click make marker
    map.addListener('dblclick', function (e) {
        if (!done) {
            if (marker.length > 0)
                deleteMarker();
            createMarker(e.latLng);
        }
    });
}

//deletes the current marker on the map and remoces it from marker array
function deleteMarker() {
    marker[0].setMap(null);
    marker = [];
}

//creates a new marker and places it on the map
function createMarker(location) {
    var markerSet = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        map: map
    });
    marker.push(markerSet);
    marker[0].setMap(map);
}

//Timer object from project 3
function zeroNum(time) {
    return '0' + time;
}

function Timer() {

    //variables
    var time = 0;
    var interval;
    var offset;

    //update the current time every 10ms
    function update() {
        time += change();
        formatTime = format(time);
        theTimer.textContent = formatTime;
    };
    //find how much time passed
    function change() {
        var current = Date.now();
        var timePass = current - offset;
        offset = current;
        return timePass;
    };

    //format the time
    function format(unformattedTime) {
        var time = new Date(unformattedTime);
        minutes = time.getMinutes().toString();
        seconds = time.getSeconds().toString();
        mili = time.getMilliseconds().toString();

        //add zeroes if necessary
        if (minutes.length < 2)
            minutes = zeroNum(minutes);
        if (seconds.length < 2)
            seconds = zeroNum(seconds);
        if (mili.length < 3)
            mili = zeroNum(mili);

        return minutes + ':' + seconds + ':' + mili;
    };

    //start the clock
    this.start = function () {
        interval = setInterval(update, 10);
        offset = Date.now();
        running = true;
    };
    //stop the clock
    this.stop = function () {
        clearInterval(interval);
        interval = null;
        running = false;
    };
    //reset the clock
    this.reset = function () {
        time = 0;
        theTimer.textContent = "00:00:000";
    };
}
//create timer object
var watch = new Timer();


//this starts the game and is run from the html code once everything has loaded
function startGame() {

    //pick first location randomly mark it as used
    var num = Math.floor(Math.random() * locations.length);
    locations[num][3] = 1;
    usedAreas.push(locations[num]);

    //pick the rest of the locations randomly
    counter = 0;
    while (counter < 5) {
        num = Math.floor(Math.random() * locations.length);
        while (locations[num][3] == 1) {
            num = Math.floor(Math.random() * locations.length);
        }
        //set it as used and push the area and its bounds for map use
        locations[num][3] = 1;
        usedAreas.push(locations[num]);
        usedBounds.push(buildingBounds[num]);
        counter++;
    }

    //counter for current question
    counter = 0;

    //show first question
    textBoxes[counter].querySelector("p").innerHTML = usedAreas.pop()[0];
    textBoxes[counter].style.display = "block";

    //go through the other 4 locations
    if (counter < 4) {
        //listen for answer for current question
        map.addListener('dblclick', function (e) {
            //if its the first answer start the timer
            if (counter == 0) {
                watch.start();
            }

            //if not done with the final question
            if (!done) {
                //get the current bounds for the location
                var currentBounds = usedBounds.pop();

                //create the rectangle around the location to check where is clicked
                var x = new google.maps.Rectangle({
                    bounds: currentBounds
                });

                //check the bounds of where is clicked is the right location
                //if the point selected is correct draw green rectangle
                if (x.getBounds().contains(e.latLng)) {
                    var rectangle = new google.maps.Rectangle({
                        strokeColor: '#00961D',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#00961D',
                        fillOpacity: 0.35,
                        map: map,
                        bounds: currentBounds
                    });

                    //change the color of the text to green and the box around it too increment correct counter
                    textBoxes[counter].querySelector("p").style.color = "green";
                    textBoxes[counter].style.border = "thick solid green";
                    correct++;

                }
                //if correct not then draw red rectangle
                else {
                    var rectangle = new google.maps.Rectangle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: map,
                        bounds: currentBounds
                    });

                    //change the color of the text to red and the box around it too
                    textBoxes[counter].querySelector("p").style.color = "red";
                    textBoxes[counter].style.border = "thick solid red";
                }

                //increment question counter and get next question
                if (counter < 4) {
                    counter++;
                    textBoxes[counter].querySelector("p").innerHTML = usedAreas.pop()[0];
                    textBoxes[counter].style.display = "block";
                }
                //else game is over
                else {
                    done = true;
                    watch.stop();
                    deleteMarker();

                    //display the total correct
                    var string = correct + ": Correct, " + (5 - correct) + ": Incorrect";
                    Score.querySelector("p").innerHTML = string;
                    Score.style.display = "block";
                }
            }
        });
    }
}