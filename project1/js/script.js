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
            map.setView([latitude, longitude], 13); 

            const country = information.querySelectorAll("country")
            document.getElementById("dropdownbtn").innerHTML = country[0].querySelector("countryName").textContent;
        }});
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

//fetch airports, universities and capital Cities from API and place markers on the map

airports = L.markerClusterGroup();

$.ajax({
    url: "php/airportsAPI.php",
    type: "GET",
    success: function(result){
        xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        const geonames = xmlDoc.querySelectorAll("geoname");
        for (let i = 0; i < 50; i++){
            const name = geonames[i].querySelector("name").textContent;
            const lat = geonames[i].querySelector("lat").textContent;
            const long = geonames[i].querySelector("lng").textContent;
            let marker = L.marker([lat, long]).bindPopup(name).openPopup();
            airports.addLayer(marker);
        }
    }
});

universities = L.markerClusterGroup();

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
            let marker = L.marker([lat, long]).bindPopup(name).openPopup();
            universities.addLayer(marker);
        }
    }
});

// capitalCities = L.layerGroup();
capitalCities = L.markerClusterGroup();

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
            let marker = L.marker([lat, long]).bindPopup(name);
            capitalCities.addLayer(marker);
        }
    }
});
  
  map = L.map("map", {
    layers: [streets, airports, universities, capitalCities]
  }).setView([54.5, -4], 6);

  var basemaps = {
    "Streets": streets,
    "Satellite": satellite
  };

  var overlayMaps = {
    "Airports": airports,
    "Universities" : universities,
    "Major Cities": capitalCities,
  };
  
  var layerControl = L.control.layers(basemaps, overlayMaps).addTo(map);
  
  L.easyButton("fa-certificate", function (btn, map) {
    $("#exampleModal").modal("show");
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

//leaflet's easybutton modal to display quick facts about the selected country 
let easyButton = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#myModal").modal("show");
    $(easyButton).css("z-index", "100");
    document.getElementById("EBcountryData").innerHTML = countryName;
    document.getElementById("EBcapitalCity").innerHTML = capitalCity;
    document.getElementById("EBareakm").innerHTML = areaSqKm;
    document.getElementById("EBcontinents").innerHTML = continentName;
  }).addTo(map);

//weather easybutton
let weather = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#weatherModal").modal("show");
    latitude = midLat;
    longitude = midLong;

    $.ajax({url: "php/weatherAPI.php?lat=" + latitude + "&lon=" + longitude,
            type: "GET",
            success: function(result){
        const response = JSON.parse(result);
        // leave below clg in for now just in case you want to add further info
        console.log(response);
        document.getElementById('weatherOverview').innerHTML = response.current.condition.text;
        document.getElementById('tempInfo').innerHTML = response.current.temp_c + " <sup>o</sup>C";
        document.getElementById('feelsLike').innerHTML = response.current.feelslike_c + " <sup>o</sup>C";
        document.getElementById('wind').innerHTML = response.current.wind_mph + "mph";
    }})

    $.ajax({url: "php/weatherForecast.php?lat=" + latitude + "&lon=" + longitude,
    type: "GET",
    success: function(response){
        const res = JSON.parse(response);
        console.log(res);
        document.getElementById("forecast").innerHTML = res.forecast.forecastday[0].day.avgtemp_c;
    }})
}).addTo(map);

//weather forecast easybutton
let weatherForecast = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#weatherForecastModal").modal("show");
    latitude = midLat;
    longitude = midLong;

    $.ajax({url: "php/weatherForecast.php?lat=" + latitude + "&lon=" + longitude,
    type: "GET",
    success: function(response){
        const res = JSON.parse(response);
        console.log(res);
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
    }})
}).addTo(map);

let exchangeRate = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#ccModal").modal("show");
    $.ajax({
        url: "php/exchangeRate.php?app_id=44a738b0aab34f73906f57e69037439a&symbols=" + currencyCode,
        type: 'GET',
        success: function(response){
            console.log(response);
            const result = JSON.parse(response);
            resultCurrency = JSON.stringify(result.rates).replace(/{/,"").replace(/}/,"").replace(/"+/g,"").replace(/:/, " : ");
            document.getElementById("resultCurrency").innerHTML = resultCurrency;
        }
    })
}).addTo(map);

function calculate(){
    const input = Number(document.getElementById("usd2Convert").value);
    if (input === NaN) {
        alert("Please enter a valid number");
    } else {
        //bring in the value of the exchange rate
        let numberCurr = Number(resultCurrency.replace(/([a-zA-Z])/g, "").replace(/:/, "").trim());
        console.log(numberCurr);
        console.log(input);
        console.log(input * numberCurr);
    }
}

//leaflet's easybutton modal to display quick facts about the selected country 
let popButton = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#popModal").modal("show");
    document.getElementById("popValue").innerHTML = pop;
    document.getElementById("langValue").innerHTML = languages;
  }).addTo(map);

//wikipedia easybutton to display an article about the area
let wikipedia = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#wikiModal").modal("show");
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
  }).addTo(map);

//leaflet's easybutton modal to display quick facts about the selected country 
let news = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#newsModal").modal("show");
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
  }).addTo(map);

//geographical information easybutton
let geoInfo = L.easyButton("fa-info fa-lg", function (btn, map) {
    $("#geoModal").modal("show");
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
}).addTo(map);