//constant to hold score box
const Score = document.querySelector("#Score");

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
    //parameters for outline
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

function deleteMarker() {
    marker[0].setMap(null);
    marker = [];
}

function createMarker(location) {
    var markerSet = new google.maps.Marker({
        position: location,
        map: map
    });
    marker.push(markerSet);
    marker[0].setMap(map);
}

function startGame() {
    //pick locations
    var num = Math.floor(Math.random() * locations.length);
    locations[num][3] = 1;
    usedAreas.push(locations[num]);

    counter = 0;
    while (counter < 5) {
        num = Math.floor(Math.random() * locations.length);
        while (locations[num][3] == 1) {
            num = Math.floor(Math.random() * locations.length);
        }
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

    if (counter < 4) {
        map.addListener('dblclick', function (e) {
            if (!done) {
                var currentBounds = usedBounds.pop();

                var x = new google.maps.Rectangle({
                    bounds: currentBounds
                });

                //if the point selected is correct show green rectangle
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

                    textBoxes[counter].querySelector("p").style.color = "green";
                    textBoxes[counter].style.border = "thick solid green";
                    correct++;

                }
                //if not then show red
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
                    deleteMarker();

                    var string = correct + ": Correct, " + (5-correct) + ": Incorrect";
                    Score.querySelector("p").innerHTML = string;
                    Score.style.display = "block";
                }
            }
        });
    }
}