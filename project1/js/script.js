//run preloader
$(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function() {
            $(this).remove()
        });
    }
});

//set up global variables
let latitude;
let longitude;
let midLat;
let midLong;
let currencyCode;
let countryArray = [];
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
let resultCurrency;
let airportsArray = [];
let airports;
let universitiesArray = [];
let universities;
let capitalCityArray = [];
let capitalCities;
let map;
let baseMap;
let earthquakesList = L.markerClusterGroup();
let flagImage;
let borderLayer;
let iso_a2;

//below code asks asks browser for location, then alerts with the coords. Show position is the callback function to retrieve coords and 
//pass to readISO.php.
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
            const countryName = information.querySelectorAll("country");
            let countryIndex;
            countryArray.forEach((country) => {
                if(countryName[0].querySelector("countryName").textContent == country.name) {
                    countryIndex = country.idx;
                }
            })
            document.getElementById("dropdownbtn").innerHTML = countryName[0].querySelector("countryName").textContent;
            fetchBoundingBox(countryIndex);
        }});

    $.ajax({
        url: 'php/openCageData.php?lat=' + latitude + "&lng=" + longitude,
        type: 'GET',
        success: function(output) {
            const res = JSON.parse(output);
            iso_a2 = res.results[0]["components"]["ISO_3166-1_alpha-2"];
            console.log(iso_a2);
        }
    });
};

function defaultPosition() {
    alert("Geolocation blocked by browser.");
    fetchBoundingBox(0)
}


var streets = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
    }
  );
  
  var satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );

// checking if this ajax call still works then delete the older commented out one
$.ajax({type:"GET", 
url: "php/readCountries.php", 
success: function(array){
    console.log('reading countries and populating dropdown...');
    const obj = JSON.parse(array);
    for (let i = 0; i < obj.length; i++) {
        $('.dropdown-menu').append('<a class="dropdown-item" href="#" onclick="fetchBoundingBox(' + i + ')">' + obj[i].name + '</a>');
        const countryObj = {name: obj[i].name, iso_a2: obj[i].iso_a2, idx: i};
        countryArray.push(countryObj);
    };
}});


//fetch airports, universities and capital Cities from API and place markers on the map

airports = L.markerClusterGroup();

let airportMarker = L.ExtraMarkers.icon({
    icon: 'fas fa-plane',
    markerColor: 'green',
    shape: 'penta',
    prefix: 'fa'
});

console.log(iso_a2);

// $.ajax({
//     url: "php/airportsAPI.php?countryName=" + iso_a2,
//     type: "GET",
//     success: function(result){
//         xmlDoc = new DOMParser().parseFromString(result, "text/xml");
//         const geonames = xmlDoc.querySelectorAll("geoname");
//         for (let i = 0; i < 50; i++){
//             const name = geonames[i].querySelector("name").textContent;
//             const lat = geonames[i].querySelector("lat").textContent;
//             const long = geonames[i].querySelector("lng").textContent;
//             let marker = L.marker([lat, long], {icon: airportMarker}).bindPopup(name);
//             airports.addLayer(marker);
//         }
//     }
// });

universities = L.markerClusterGroup();

let universityMarker = L.ExtraMarkers.icon({
    icon: 'fas fa-university',
    markerColor: 'black',
    shape: 'square',
    prefix: 'fa'
});

$.ajax({
    url: "php/universitiesAPI.php",
    type: "GET",
    success: function(result){
        xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        const geonames = xmlDoc.querySelectorAll("geoname");
        for (let i = 0; i < 50; i++) {
            const name = geonames[i].querySelector("name").textContent;
            const lat = geonames[i].querySelector("lat").textContent;
            const long = geonames[i].querySelector("lng").textContent;
            let marker = L.marker([lat, long], {icon: universityMarker}).bindPopup(name);
            universities.addLayer(marker);
        }
    }
});

// capitalCities = L.layerGroup();
capitalCities = L.markerClusterGroup();

let cityMarker = L.ExtraMarkers.icon({
    icon: 'far fa-building',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});

$.ajax({
    url: "php/capitalCitiesAPI.php",
    type: "GET",
    success: function(result){
        xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        const geonames = xmlDoc.querySelectorAll("geoname");
        for (let i = 0; i < 50; i++) {
            const name = geonames[i].querySelector("name").textContent;
            const lat = geonames[i].querySelector("lat").textContent;
            const long = geonames[i].querySelector("lng").textContent;
            let marker = L.marker([lat, long], {icon: cityMarker}).bindPopup(name);
            capitalCities.addLayer(marker);
        }
    }
});
  
  map = L.map("map", {
    layers: [streets, airports, universities, capitalCities, earthquakesList]
  }).setView([54.5, -4], 6);

  var basemaps = {
    "Streets": streets,
    "Satellite": satellite
  };

  var overlayMaps = {
    "Airports": airports,
    "Universities" : universities,
    "Major Cities": capitalCities,
    "Earthquakes": earthquakesList,
  };
  
  var layerControl = L.control.layers(basemaps, overlayMaps).addTo(map);
  

// fetch all country names and populate the drop down menu
// $.ajax({type:"GET", 
// url: "php/readCountries.php", 
// success: function(array){
// const obj = JSON.parse(array);
// for (let i = 0; i < obj.length; i++) {
//     $('.dropdown-menu').append('<a class="dropdown-item" href="#" onclick="fetchBoundingBox(' + i + ')">' + obj[i].name + '</a>');
//     const countryObj = {name: obj[i].name, iso_a2: obj[i].iso_a2, idx: i};
//     countryArray.push(countryObj);
// };
// }});


function fetchBoundingBox(countryIdx) {

    console.log('fetching bounding box...');

    if (borderLayer) {
        map.removeLayer(borderLayer);
    };

    $.ajax({
        url: 'php/readCountryInfo.php?country=' + countryArray[countryIdx].iso_a2,
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
            earthquakes(north, south, east, west);
            flagImage = "https://flagsapi.com/" + countryCode + "/flat/64.png";
        }
    });

    //read in country borders php call and place border on map
    $.ajax({
        type: "GET",
        url: "php/readCountryBorders.php",
        success: function(output){
            const resp = JSON.parse(output);
            borderLayer = L.geoJSON(resp.features[countryIdx]);
            borderLayer.addTo(map);
        }
    });

    console.log('iso_a2 to be fed into airports API: ' + countryArray[countryIdx].iso_a2);
    $.ajax({
        url: "php/airportsAPI.php?country=" + countryArray[countryIdx].iso_a2,
        type: "GET",
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            console.log(xmlDoc);
            // const geonames = xmlDoc.querySelectorAll("geoname");
            // for (let i = 0; i < 50; i++){
            //     const name = geonames[i].querySelector("name").textContent;
            //     const lat = geonames[i].querySelector("lat").textContent;
            //     const long = geonames[i].querySelector("lng").textContent;
            //     let marker = L.marker([lat, long], {icon: airportMarker}).bindPopup(name);
            //     airports.addLayer(marker);
            // }
        }
    });
}

function earthquakes(north, east, south, west) {
    let eqMarker = L.ExtraMarkers.icon({
        icon: 'fas fa-bullseye',
        markerColor: 'yellow',
        shape: 'circle',
        prefix: 'fa'
    });

    $.ajax({
        url: 'php/earthquakes.php?north=' + north + "&south=" + south + "&east=" + east + "&west=" + west,
        type: 'GET',
        success: function(response) {
            const resp = JSON.parse(response);
            for (let i = 0; i < resp.earthquakes.length; i++){
                const date = resp.earthquakes[i].datetime;
                const depth = resp.earthquakes[i].depth;
                const magnitude = resp.earthquakes[i].magnitude;
                const lat = resp.earthquakes[i].lat;
                const long = resp.earthquakes[i].lng;
                let marker = L.marker([lat, long], {icon: eqMarker}).bindPopup("<h5>Earthquake</h5>" + "<br><b>Date and time: </b>" + date + "<br><b>Depth: </b>" + depth + "<br><b>Magnitude: </b>" + magnitude);
                earthquakesList.addLayer(marker);
            }
        }
    })
}

//leaflet's easybutton modal to display quick facts about the selected country 
let easyButton = L.easyButton("fas fa-info fa-lg", function (btn, map) {
    $("#myModal").modal("show");
    $(easyButton).css("z-index", "100");
    document.getElementById("EBcountryData").innerHTML = countryName;
    document.getElementById("flagImg").innerHTML = '';
    let img = document.createElement('img');
    img.src = flagImage;
    document.getElementById("flagImg").appendChild(img);
    document.getElementById("EBcapitalCity").innerHTML = capitalCity;
    document.getElementById("EBareakm").innerHTML = areaSqKm;
    document.getElementById("EBcontinents").innerHTML = continentName;
  }).addTo(map);

//weather easybutton
let weather = L.easyButton("fas fa-cloud-sun fa-lg", function (btn, map) {
    latitude = midLat;
    longitude = midLong;

    $.ajax({url: "php/weatherAPI.php?lat=" + latitude + "&lon=" + longitude,
            type: "GET",
            success: function(result){
        const response = JSON.parse(result);

        try {
            $("#weatherModal").modal("show");
            document.getElementById('weatherOverview').innerHTML = response.current.condition.text;
            document.getElementById('tempInfo').innerHTML = response.current.temp_c + " <sup>o</sup>C";
            document.getElementById('feelsLike').innerHTML = response.current.feelslike_c + " <sup>o</sup>C";
            document.getElementById('wind').innerHTML = response.current.wind_mph + "mph";
        }
        catch(err) {
            $("#weatherModal").modal("hide");
            alert('No weather data available from API in this area.')
        }
    },
    })
}).addTo(map);

//weather forecast easybutton
let weatherForecast = L.easyButton("fas fa-temperature-low fa-lg", function (btn, map) {

    latitude = midLat;
    longitude = midLong;

    $.ajax({url: "php/weatherForecast.php?lat=" + latitude + "&lon=" + longitude,
    type: "GET",
    success: function(response){
        const res = JSON.parse(response);
        try {
            $("#weatherForecastModal").modal("show");
            document.getElementById("day1").innerHTML = res.forecast.forecastday[1].date;
            document.getElementById("day2").innerHTML = res.forecast.forecastday[2].date;
            document.getElementById("day3").innerHTML = res.forecast.forecastday[3].date;
            document.getElementById("forecast").innerHTML = res.forecast.forecastday[1].day.avgtemp_c;
            document.getElementById("forecast2").innerHTML = res.forecast.forecastday[2].day.avgtemp_c;
            document.getElementById("forecast3").innerHTML = res.forecast.forecastday[3].day.avgtemp_c;
            document.getElementById("tempHigh").innerHTML = res.forecast.forecastday[1].day.maxtemp_c;
            document.getElementById("tempHigh2").innerHTML = res.forecast.forecastday[2].day.maxtemp_c;
            document.getElementById("tempHigh3").innerHTML = res.forecast.forecastday[3].day.maxtemp_c;
            document.getElementById("tempLow").innerHTML = res.forecast.forecastday[1].day.mintemp_c;
            document.getElementById("tempLow2").innerHTML = res.forecast.forecastday[2].day.mintemp_c;
            document.getElementById("tempLow3").innerHTML = res.forecast.forecastday[3].day.mintemp_c;
            document.getElementById("rain").innerHTML = res.forecast.forecastday[1].day.totalprecip_mm;
            document.getElementById("rain2").innerHTML = res.forecast.forecastday[2].day.totalprecip_mm;
            document.getElementById("rain3").innerHTML = res.forecast.forecastday[3].day.totalprecip_mm;
            document.getElementById("wind").innerHTML = res.forecast.forecastday[1].day.maxwind_mph;
            document.getElementById("wind2").innerHTML = res.forecast.forecastday[2].day.maxwind_mph;
            document.getElementById("wind3").innerHTML = res.forecast.forecastday[3].day.maxwind_mph;
            document.getElementById("uv").innerHTML = res.forecast.forecastday[1].day.uv;
            document.getElementById("uv2").innerHTML = res.forecast.forecastday[2].day.uv;
            document.getElementById("uv3").innerHTML = res.forecast.forecastday[3].day.uv;
        } catch (err) {
            $("#weatherForecastModal").modal("hide");
            alert("No weather forecast information available in this area from API.")
        }
    }})
}).addTo(map);

let exchangeRate = L.easyButton("fas fa-dollar-sign fa-lg", function (btn, map) {
    $("#ccModal").modal("show");
    $.ajax({
        url: "php/exchangeRate.php?app_id=44a738b0aab34f73906f57e69037439a&symbols=" + currencyCode,
        type: 'GET',
        success: function(response){
            const result = JSON.parse(response);
            resultCurrency = JSON.stringify(result.rates).replace(/{/,"").replace(/}/,"").replace(/"+/g,"").replace(/:/, " : ");
            document.getElementById("resultCurrency").innerHTML = resultCurrency;
        }
    })
}).addTo(map);

function calculate(){
    const input = Number(document.getElementById("usd2Convert").value);
    if (isNaN(input)) {
        alert("Please enter a valid number");
    } else {
        //bring in the value of the exchange rate
        let numberCurr = Number(resultCurrency.replace(/([a-zA-Z])/g, "").replace(/:/, "").trim());
        document.getElementById("resultAmount").innerHTML = input * numberCurr;
    }
}

//leaflet's easybutton modal to display quick facts about the selected country 
let popButton = L.easyButton("fas fa-users fa-lg", function (btn, map) {
    $("#popModal").modal("show");
    document.getElementById("popValue").innerHTML = pop;
    document.getElementById("langValue").innerHTML = languages;
  }).addTo(map);

//wikipedia easybutton to display an article about the area
let wikipedia = L.easyButton("fab fa-wikipedia-w fa-lg", function (btn, map) {
    $("#wikiModal").modal("show");
    $.ajax({
        url: "php/wikipedia.php?north=" + north + "&south=" + south + "&east=" + east + "&west=" + west,
        type: "GET",
        success: function(result){
            const xmlDoc = new DOMParser().parseFromString(result, "text/xml")
            const entries = xmlDoc.querySelectorAll("entry");

            //if stmnt not working as intended, may try to replace with a try catch?
            if (typeof entries === 'undefined') {
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
  }).addTo(map);

//leaflet's easybutton modal to display quick facts about the selected country 
let news = L.easyButton("far fa-newspaper fa-lg", function (btn, map) {
    $("#newsModal").modal("show");
    $(".news-list").empty();

    $.ajax({
        url: "php/newsAPI.php?country=" + countryCode,
        type: "GET",
        success: function(result){
            const resp = JSON.parse(result);
            if (resp.totalResults !== 0) {
                articles = resp.articles;
                articles.forEach(element => {
                    let ul = document.querySelector("ul");
                    let li = document.createElement("li");
                    li.className = "news-list-item";
                    li.textContent = element.title;
                    ul.appendChild(li);
                });
            } else {
                let ul = document.querySelector("ul");
                let li = document.createElement("li");
                li.className = "news-list-item";
                li.textContent = "No news available in this area.";
                ul.appendChild(li);
            }
        }
    })
  }).addTo(map);