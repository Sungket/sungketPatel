//set up global variables
let latitude;
let longitude;
let midLat;
let midLong;
let currencyCode;
let countryCode;

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

function defaultPosition() {
    alert("Geolocation blocked by browser.");

    fetchBoundingBox(0)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
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

// Clicking on the weather button function
function fetchWeatherInfo() {
    latitude = midLat;
    longitude = midLong;
    $.ajax({url: "php/weatherAPI.php?lat=" + latitude + "&lon=" + longitude + "&appid=7b964a710daaa3af6d297d5f54bc105d",
            type: "GET",
            success: function(result){
        const response = JSON.parse(result);
        // leave below clg in for now just in case you want to add further info
        console.log(response);
        const celsius = (Number(response.main.temp) - 273.15).toFixed(0);
        const feelsLikeTemp = (Number(response.main.feels_like) - 273.15).toFixed(0);
        document.getElementById('weatherOverview').innerHTML = response.weather[0].description;
        document.getElementById('tempInfo').innerHTML = celsius + " <sup>o</sup>C";
        document.getElementById('feelsLike').innerHTML = feelsLikeTemp + " <sup>o</sup>C";
        document.getElementById('wind').innerHTML = response.wind.speed + " m/s";
    }})

    $.ajax({url: "utils/countryBorders.geo.json", success: function(res){
        const resp = JSON.parse(res);
    }});
}

// clicking on exchange rate button
function exchangeRate() {
    $.ajax({
        url: "php/exchangeRate.php?app_id=44a738b0aab34f73906f57e69037439a&symbols=" + currencyCode,
        type: 'GET',
        success: function(response){
            console.log(response);
            const result = JSON.parse(response);
            const resultCurrency = JSON.stringify(result.rates).replace(/{/,"").replace(/}/,"").replace(/"+/g,"").replace(/:/, " : ");
            console.log(typeof resultCurrency);
            document.getElementById("resultCurrency").innerHTML = resultCurrency;
        }
    })
}

// fetching information on POI
function pointsOfInterest() {
    let mountainList;
    $.ajax({
        url: "php/mountainsPOI.php?q=mountain&country=" + countryCode,
        type: 'GET',
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");;
            const geonames = xmlDoc.querySelectorAll("geoname");

            for (const geoname of geonames) {
                const mountain = geoname.querySelector("toponymName").textContent;
                if (mountain.includes("Airport") || mountain.includes("Park")){
                    continue;
                } else {
                    mountainList += mountain + ",\n";
                }
            }
            document.getElementById("mountainList").innerHTML = mountainList;
        }
    })

    let lakeList;
    $.ajax({
        url: "php/lakesPOI.php?q=lake&country=" + countryCode,
        type: 'GET',
        async: false,
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");;
            const geonames = xmlDoc.querySelectorAll("geoname");

            for (const geoname of geonames) {
                const lake = geoname.querySelector("name").textContent;
                if (lake.includes("Airport") || lake.includes("Park")){
                    continue;
                } else {
                    lakeList += lake + ",\n";
                }
            }
            document.getElementById("lakeList").innerHTML = lakeList;
        }
    })

    let riverList
    $.ajax({
        url: "php/riversPOI.php?q=river&country=" + countryCode,
        type: 'GET',
        async: false,
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");;
            const geonames = xmlDoc.querySelectorAll("geoname");

            for (const geoname of geonames) {
                const river = geoname.querySelector("name").textContent;
                if (river.includes("Airport") || river.includes("Park")) {
                    continue;
                } else {
                    riverList += river + ",\n";
                }
            }
            document.getElementById("riverList").innerHTML = riverList;
        }
    })
}

function fetchBoundingBox(countryIdx) {
    // countryIdx needs to match up with with the index of the ISO_a2 array in order to get the required coords
    const isoMap = new Map();

    $.ajax({
        url: "php/readCountriesISO2.php",
        type: "GET",
        async: false,
        success: function(ISOArray){
            const resp = JSON.parse(ISOArray);
            for (let j = 0; j < resp.length; j++) {
                isoMap.set(j, resp[j]);
            }
        }
    })

    //now match countryIdx with the keys of the maps to get the ISO_a2 code
    let isoCode;

    for (let [key, value] of isoMap.entries()) {
        if (countryIdx === key) {
            isoCode = value;
        }
    }

    $.ajax({
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
            currencyCode = info[0].querySelector("currencyCode").textContent;
            countryCode = info[0].querySelector("countryCode").textContent;
            midLat = (Number(north) + Number(south)) / 2;
            midLong = (Number(east) + Number(west)) / 2;
            map.setView([midLat, midLong], 5); 
            const nameOfCountry = xmlDoc.getElementsByTagName("countryName")[0].childNodes[0].nodeValue;
            document.getElementById("dropdownbtn").innerHTML = nameOfCountry;
        }
    });
}

function wikipedia() {
    let north;
    let east;
    let south;
    let west;

    $.ajax({
        url: 'php/readCountryInfo.php?country=' + isoCode,
        type: 'GET',
        async: false,
        success: function(response){
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(response, "text/xml");
            const info = xmlDoc.querySelectorAll("country");
            north = info[0].querySelector("north").textContent;
            east = info[0].querySelector("east").textContent;
            south = info[0].querySelector("south").textContent;
            west = info[0].querySelector("west").textContent;
        }
    })

    $.ajax({
        url: "php/wikipedia.php?north=" + north + "&south=" + south + "&east=" + east + "&west=" + west,
        type: "GET",
        success: function(result){
            console.log(result);
        }
    })
}