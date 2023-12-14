let latitude;
let longitude;
//initialise map and view
let map = L.map('map').setView([52, 0], 13);

//below code asks asks browser for location, then alerts with the coords. Show position is the callback function to retrieve coords and 
// pass to readISO.php.
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
    } else {
        defaultPosition();
    }

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    $.ajax({
        url: 'php/readISO.php?lat=' + latitude + '&lng=' + longitude + '&username=sungket&style=full',
        type:'GET',
        success: function(array){
            let parser = new DOMParser();
            let information = parser.parseFromString(array, "text/xml");
            map.setView([latitude, longitude], 13); 

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            const country = information.querySelectorAll("country")
            document.getElementById("dropdownbtn").innerHTML = country[0].querySelector("countryName").textContent;
        }});
};

function defaultPosition(position) {
    alert("Geolocation blocked by browser.");

    //read in the file of countries, get the first country, then get it's coords to feed into map.setView
    fetchBoundingBox(0)

    // map.setView([25, 77], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // let resp;

    // $.ajax({url: "utils/countryBorders.geo.json", success: function(res){
    //     resp = JSON.parse(res);
    //     let specifics = resp["features"][0]["geometry"]["coordinates"];
    //     console.log(specifics);
    // }});

    // let coords = resp;

    // let countryLayer = L.geoJSON(coords).addTo(map);
}


//markers, points etc
let marker = L.marker([51.5, -0.09]).addTo(map);

let circle = L.circle(([51.508, -0.11]), {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

circle.bindPopup("I am a circle.");

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

polygon.bindPopup("I am a polygon.");

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

var helloPopup = L.popup().setContent('Hello World!');

let easyButton = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#myModal").modal("show");
  }).addTo(map);

// fetch all country names and populate the drop down menu
$.ajax({type:"GET", 
        url: "php/readCountries.php", 
        success: function(array){
    //now returning a JSON object, the iterator reads through the array and populates the dropdown
    const obj = JSON.parse(array);
    for (let i = 0; i < obj.length; i++) {
        $('.dropdown-menu').append('<a class="dropdown-item" href="#" onclick="fetchBoundingBox(' + i + ')">' + obj[i] + '</a>');
    };
}});


// onchange event handler once user clicks on a country, fetches the border coords
function getBorders(i) {
    const countryIndex = i;
    $.ajax({
            url: 'php/readBorders.php?countryIndex=' + countryIndex,
            type:'GET',
            success: function(array){
                console.log(array);
                console.log(typeof array);
            }});
}

function fetchWeatherInfo() {
    $.ajax({url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=7b964a710daaa3af6d297d5f54bc105d", success: function(result){
        const response = JSON.parse(result);
        console.log(response);
    }})

    $.ajax({url: "utils/countryBorders.geo.json", success: function(res){
        const resp = JSON.parse(res);
        console.log(typeof resp);
    }});
}

// document.getElementById("country", fetchBoundingBox, false);

function fetchBoundingBox(countryIdx) {
    // const countryName = String(country);
    // countryIdx needs to match up with with the index of the ISO_a2 array
    const isoMap = new Map();

    $.ajax({
        url: "php/readCountriesISO2.php",
        type: "GET",
        async: false,
        success: function(ISOArray){
            const resp = JSON.parse(ISOArray);
            console.log(resp);
            for (let j = 0; j < resp.length; j++) {
                isoMap.set(j, resp[j]);
            }
        }
    })
    console.log(isoMap);
    //now match countryIdx with the keys of the maps to get the ISO_a2 code
    let isoCode;

    for (let [key, value] of isoMap.entries()) {
        if (countryIdx === key) {
            isoCode = value;
        }
    }

    console.log(isoCode);
    let midLat;
    let midLong;

    $.ajax({
        // url: 'php/readCountryInfo.php?country=' + countryName,
        url: 'php/readCountryInfo.php?country=' + isoCode,
        type: 'GET',
        success: function(response){
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(response, "text/xml");
            const info = xmlDoc.querySelectorAll("country");
            const north = info[0].querySelector("north").textContent;
            const east = info[0].querySelector("east").textContent;
            const south = info[0].querySelector("south").textContent;
            const west = info[0].querySelector("west").textContent;
            midLat = (Number(north) + Number(south)) / 2;
            midLong = (Number(east) + Number(west)) / 2;
            map.setView([midLat, midLong], 5); 
            const nameOfCountry = xmlDoc.getElementsByTagName("countryName")[0].childNodes[0].nodeValue;
            document.getElementById("dropdownbtn").innerHTML = nameOfCountry;
        }
    });

}