//set up global variables
let latitude;
let longitude;
let midLat;
let midLong;
let currencyCode;
let countryCode;
let countryName;
let capitalCity;
let areaSqKm;
let continentName;
let pop;
let languages;
let north;
let east;
let south;
let west;

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

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


// let circle = L.circle(([51.508, -0.11]), {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// circle.bindPopup("I am a circle.");

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

// polygon.bindPopup("I am a polygon.");

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);

// var helloPopup = L.popup().setContent('Hello World!');

//leaflet's easybutton modal to display quick facts about the selected country 
let easyButton = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#myModal").modal("show");
    document.getElementById("EBcountryData").innerHTML = countryName;
    document.getElementById("EBcapitalCity").innerHTML = capitalCity;
    document.getElementById("EBareakm").innerHTML = areaSqKm;
    document.getElementById("EBcontinents").innerHTML = continentName;
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


$.ajax({
    url: "php/airportsAPI.php",
    type: "GET",
    success: function(result){
        xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        const geonames = xmlDoc.querySelectorAll("geoname");
        // for (geoname of geonames) {
        //     const name = geoname.querySelector("name").textContent;
        //     const lat = geoname.querySelector("lat").textContent;
        //     const long = geoname.querySelector("lng").textContent;
        //     let marker = L.marker([lat, long]).addTo(map);
        //     marker.bindPopup(name).openPopup();
        // }
        for (let i = 0; i < 16; i++){
            const name = geonames[i].querySelector("name").textContent;
            const lat = geonames[i].querySelector("lat").textContent;
            const long = geonames[i].querySelector("lng").textContent;
            let marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup(name).openPopup();
        }
    }
});



$.ajax({
    url: "php/universitiesAPI.php",
    type: "GET",
    success: function(result){
        xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        const geonames = xmlDoc.querySelectorAll("geoname");
        for (let i = 0; i < 16; i++) {
            const name = geonames[i].querySelector("name").textContent;
            const lat = geonames[i].querySelector("lat").textContent;
            const long = geonames[i].querySelector("lng").textContent;
            let marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup(name).openPopup();
        }
    }
});

$.ajax({
    url: "php/capitalCitiesAPI.php",
    type: "GET",
    success: function(result){
        xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        const geonames = xmlDoc.querySelectorAll("geoname");
        for (let i = 0; i < 16; i++) {
            const name = geonames[i].querySelector("name").textContent;
            const lat = geonames[i].querySelector("lat").textContent;
            const long = geonames[i].querySelector("lng").textContent;
            let marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup(name).openPopup();
        }
    }
});

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
            north = info[0].querySelector("north").textContent;
            east = info[0].querySelector("east").textContent;
            south = info[0].querySelector("south").textContent;
            west = info[0].querySelector("west").textContent;
            currencyCode = info[0].querySelector("currencyCode").textContent;
            countryCode = info[0].querySelector("countryCode").textContent;
            countryName = info[0].querySelector("countryName").textContent;
            capitalCity = info[0].querySelector("capital").textContent;
            continentName = info[0].querySelector("continentName").textContent;
            areaSqKm = info[0].querySelector("areaInSqKm").textContent;
            pop = info[0].querySelector("population").textContent;
            languages = info[0].querySelector("languages").textContent;
            midLat = (Number(north) + Number(south)) / 2;
            midLong = (Number(east) + Number(west)) / 2;
            map.setView([midLat, midLong], 5); 
            const nameOfCountry = xmlDoc.getElementsByTagName("countryName")[0].childNodes[0].nodeValue;
            document.getElementById("dropdownbtn").innerHTML = nameOfCountry;
        }
    });
}

function wikipedia() {

    $.ajax({
        url: "php/wikipedia.php?north=" + north + "&south=" + south + "&east=" + east + "&west=" + west,
        type: "GET",
        success: function(result){
            const xmlDoc = new DOMParser().parseFromString(result, "text/xml")
            const entries = xmlDoc.querySelectorAll("entry");

            //if stmnt not working as intended, may try to replace with a try catch?
            if (!entries) {
                document.getElementById("wikiTitle").innerHTML = "No news available in this area";
            } else {
                for (const entry of entries) {
                    const infoType = entry.querySelector("feature").textContent;
                    const title = entry.querySelector("title").textContent;
                    const article = entry.querySelector("summary").textContent;
                    if (infoType == "country" && title == countryName) {
                        document.getElementById("wikiTitle").innerHTML = title;
                        document.getElementById("wikiArticle").innerHTML = article;
                    }
                }
            }
        }
    })
}

function news() {

    $(".news-list").empty();

    $.ajax({
        url: "php/newsAPI.php?country=" + countryCode,
        type: "GET",
        success: function(result){
            const resp = JSON.parse(result);
            articles = resp.articles;
            articles.forEach(element => {
                let ul = document.querySelector("ul");
                let li = document.createElement("li");
                li.className = "news-list-item";
                li.textContent = element.title;
                ul.appendChild(li);
            });
        }
    })
}

function population() {

    document.getElementById("popValue").innerHTML = pop;
    document.getElementById("langValue").innerHTML = languages;
}