//run preloader
$(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function() {
            $(this).remove()
        });
    }
});

//global variables
let border;
let firstCountry;

// set up tile layers for map
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


//set marker icons and layers

airports = L.markerClusterGroup();

let airportMarker = L.ExtraMarkers.icon({
    icon: 'fas fa-plane',
    markerColor: 'green',
    shape: 'penta',
    prefix: 'fa'
});


universities = L.markerClusterGroup();

let universityMarker = L.ExtraMarkers.icon({
    icon: 'fas fa-university',
    markerColor: 'black',
    shape: 'square',
    prefix: 'fa'
});


capitalCities = L.markerClusterGroup();

let cityMarker = L.ExtraMarkers.icon({
    icon: 'far fa-building',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});


earthquakes = L.markerClusterGroup();

let eqMarker = L.ExtraMarkers.icon({
    icon: 'fas fa-bullseye',
    markerColor: 'yellow',
    shape: 'circle',
    prefix: 'fa'
});

  var basemaps = {
    "Streets": streets,
    "Satellite": satellite
  };

  var overlayMaps = {
    "Airports": airports,
    "Universities" : universities,
    "Capital Cities": capitalCities,
    "Earthquakes": earthquakes,
  };
  
  let map = L.map("map", {
    layers: [streets, airports, universities, capitalCities, earthquakes]
  }).setView([54.5, -4], 6);
  
  var layerControl = L.control.layers(basemaps, overlayMaps).addTo(map);


//easybuttons
L.easyButton("fa-info", function (btn, map) {
    $("#quickModal").modal("show");
  }).addTo(map);

L.easyButton("fas fa-cloud-sun fa-lg", function (btn, map) {
    $("#weatherModal").modal("show");
}).addTo(map);

L.easyButton("fas fa-dollar-sign fa-lg", function (btn, map) {
    $("#currencyModal").modal("show");
}).addTo(map);

L.easyButton("fas fa-users fa-lg", function (btn, map) {
    $("#populationModal").modal("show");
}).addTo(map);

L.easyButton("fab fa-wikipedia-w fa-lg", function (btn, map) {
    $("#wikiModal").modal("show");
}).addTo(map);

L.easyButton("far fa-newspaper fa-lg", function (btn, map) {
    $("#newsModal").modal("show");
}).addTo(map);


//populate the select dropdown by reading in the countrybordersgeoJSON file
$.ajax({type:"GET", 
url: "php/readISO2GeoJSON.php", 
success: function(array){
    let tempArray = [];
    const obj = JSON.parse(array);
    for (let i = 0; i < obj.length; i++) {
        let option = document.createElement("option");
        option.text = obj[i].name;
        option.value = obj[i].iso_a2;
        tempArray.push(option);
    };
    //sort tempArray alphabetically    
    tempArray.sort(function (a, b) {
        if (a.text < b.text) {
          return -1;
        }
        if (a.text > b.text) {
          return 1;
        }
        return 0;
      });

    tempArray.forEach(element => {
        $(".form-select").append(element);
    });
    firstCountry = tempArray[0].attributes.value.value;
}});


//below code asks asks browser for location, then sets map with the coords. If location turned off, it pulls details of first country in dropdown list.
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, window.onload = defaultPosition);
    } 
    else {
        defaultPosition();
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        //using openCageData to retrieve the iso_a2 of the current location of the browser, then pass into selectedCountry
        $.ajax({
            url: 'php/openCageDataLatLng.php?lat=' + latitude + "&lng=" + longitude,
            type: 'GET',
            success: function(output) {
                const res = JSON.parse(output);
                iso_a2 = res.results[0]["components"]["ISO_3166-1_alpha-2"];
                selectedCountry(iso_a2);
                // currencySymbol = res.results[0]["annotations"]["currency"]["symbol"];
                // console.log(currencySymbol);
            }
        });
    };
    
    function defaultPosition() {
        selectedCountry(firstCountry);
    };


// iso_a2 is passed in as value argument
function selectedCountry(value) {
    //below logs the country ISO A2 designation
    console.log(value);

    if (border) {
        map.removeLayer(border);
    };

    airports.clearLayers();
    universities.clearLayers();
    capitalCities.clearLayers();

    $.ajax({
        url: "php/readCountryBorders.php", 
        type:"POST",
        data: {value: value},
        success: function(output) {
            const result = JSON.parse(output);
            border = L.geoJSON(result);
            border.addTo(map);
            map.fitBounds(border.getBounds());
        }
    });

    $.ajax({
        url: "php/capitalCitiesAPI.php?country=" + value,
        type: "GET",
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            const geonames = xmlDoc.querySelectorAll("geoname");
            const name = geonames[0].querySelector("name").textContent;
            const lat = geonames[0].querySelector("lat").textContent;
            const long = geonames[0].querySelector("lng").textContent;
            let marker = L.marker([lat, long], {icon: cityMarker}).bindPopup(name + cityImage);
            capitalCities.addLayer(marker);
        }
    });

    $.ajax({
        url: "php/airportsAPI.php?country=" + value,
        type: "GET",
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            const geonames = xmlDoc.querySelectorAll("geoname");
            try{
                for (let i = 0; i < 50; i++){
                    const name = geonames[i].querySelector("name").textContent;
                    const lat = geonames[i].querySelector("lat").textContent;
                    const long = geonames[i].querySelector("lng").textContent;
                    let marker = L.marker([lat, long], {icon: airportMarker}).bindPopup(name);
                    airports.addLayer(marker);
                }
            } catch {
                console.log('exhausted airport data');
            }

        }
    });

    $.ajax({
        url: "php/universitiesAPI.php?country=" + value,
        type: "GET",
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            const geonames = xmlDoc.querySelectorAll("geoname");
            try{
                for (let i = 0; i < 50; i++) {
                    const name = geonames[i].querySelector("name").textContent;
                    const lat = geonames[i].querySelector("lat").textContent;
                    const long = geonames[i].querySelector("lng").textContent;
                    let marker = L.marker([lat, long], {icon: universityMarker}).bindPopup(name);
                    universities.addLayer(marker);
                }
            } catch {
                console.log('exhausted university data');
            }

        }
    });

    $.ajax({
        url: "php/readCountryInfo.php?country=" + value,
        type: "GET",
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            const info = xmlDoc.querySelectorAll("country");
            const countryAlias = info[0].querySelector("countryName").textContent;
            const capitalCity = info[0].querySelector("capital").textContent;
            north = info[0].querySelector("north").textContent;
            east = info[0].querySelector("east").textContent;
            south = info[0].querySelector("south").textContent;
            west = info[0].querySelector("west").textContent;

            //populate quick facts modal as it uses the same API
            $("#countryName").html(countryAlias);
            $("#flagImage").html("");
            let img = document.createElement('img');
            img.src = "https://flagsapi.com/" + value + "/flat/64.png";
            document.getElementById("flagImage").appendChild(img);
            $("#capitalCity").html(capitalCity);
            $("#areakm").html(numeral(info[0].querySelector("areaInSqKm").textContent).format('0,0'));
            $("#continent").html(info[0].querySelector("continentName").textContent);

            fetchInformation(countryAlias);
            cityWeather(capitalCity);
            earthquake(north, east, south, west);
        }
    })
};


function fetchInformation(info) {
    //info arg is the name of the country which is used as an arg for the openCageAPI
    //using openCageData to retrieve other data about the location
    $.ajax({
        url: 'php/openCageData.php?countrycode=' + info,
        type: 'GET',
        success: function(output) {
            const res = JSON.parse(output);
            let currencyName = res.results[0]["annotations"]["currency"]["iso_code"];
            iso_a2 = res.results[0]["components"]["ISO_3166-1_alpha-2"];
            currencySymbol = res.results[0]["annotations"]["currency"]["symbol"];
            currency(currencyName);
            news(iso_a2, info);
            wikipedia(info);
            population(iso_a2);
        }
    });

};


//Weather function for the capital city of the country
function cityWeather(city) {
    //below logs the name of the capital city which is used as the location arg into weather API
    $.ajax({
        url: "php/weatherForecast.php?city=" + city,
            type: "GET",
            success: function(result){
            const response = JSON.parse(result);

        try {
            $('#lastUpdated').html((response.current.last_updated).replace(/"/g, ""));
            $('#weatherModalLabel').html("Weather in " + response.location.name + ", " + response.location.country);
            $('#todayHigh').html(response.current.temp_c);
            $('#currentCondition').html(response.current.condition.text);
            $('#conditionIcon').attr("src", response.current.condition.icon);

            $('#fc1Low').html(response.forecast.forecastday[0].day.mintemp_c);
            $('#fc1Day').html(response.forecast.forecastday[0].date);

            $('#fc2High').html(response.forecast.forecastday[1].day.maxtemp_c);
            $('#fc2Low').html(response.forecast.forecastday[1].day.mintemp_c);
            $('#fc2ConditionIcon').attr("src", response.forecast.forecastday[1].day.condition.icon);
            $('#fc2Day').html(response.forecast.forecastday[1].date);

            $('#fc3High').html(response.forecast.forecastday[2].day.maxtemp_c);
            $('#fc3Low').html(response.forecast.forecastday[2].day.mintemp_c);
            $('#fc3ConditionIcon').attr("src", response.forecast.forecastday[2].day.condition.icon);
            $('#fc3Day').html(response.forecast.forecastday[2].date);
        }
        catch {
            $("#weatherModal").modal("hide");
            alert('No weather data available from API in this area.')
        }
    },
    });
}


//currency converter functions
let resultCurrency;
function currency(currencyCode) {
    $.ajax({
        url: "php/exchangeRate.php?app_id=44a738b0aab34f73906f57e69037439a&symbols=" + currencyCode,
        type: 'GET',
        success: function(response){
            const result = JSON.parse(response);
            const resultingCurrNumber = numeral(JSON.stringify(result.rates).replace(/{/,"").replace(/}/,"").replace(/"+/g,"").replace(/:/, "").replace(/([a-zA-Z])/g, "").trim()).format('0.00');
            resultCurrency = JSON.stringify(result.rates).replace(/{/,"").replace(/}/,"").replace(/"+/g,"").replace(/:/, " : ");
            const date = Date.today().toString("MMMM dS yyyy");
            $("#currentExchangeInfo").html(`As of ${date}, 1 USD equals ${resultingCurrNumber} ${currencyCode}`);
        }
    });
};
function calculate() {
    const input = Number(document.getElementById("usd2Convert").value);
    if (isNaN(input)) {
        alert("Please enter a valid number");
    } else {
        //bring in the value of the exchange rate
        let numberCurr = Number(resultCurrency.replace(/([a-zA-Z])/g, "").replace(/:/, "").trim());
        $("#resultAmount").val(numeral(input * numberCurr).format('0.00'));
    }
};

//wikipedia function takes in the name of the country as arg
function wikipedia(input) {
    let image1;
    let image2;
    let image3;

    //inputting in the country name on initial load up
    $.ajax({
        url: "php/unsplashPhotos.php?loc=" + input,
        type: "GET",
        async: false,
        success: function(response) {
            const output = JSON.parse(response);
            console.log(output);
            image1 = output.results[0].urls.thumb;
            image2 = output.results[1].urls.thumb;
            image3 = output.results[2].urls.thumb;
        }
    })

    $.ajax({
        url: "php/wikipedia.php?input=" + input,
        type: "GET",
        async: false,
        success: function(response){
            photos(input);
            const xmlDoc = new DOMParser().parseFromString(response, "text/xml")
            const entries = xmlDoc.querySelectorAll("entry");
            if (typeof entries === 'undefined') {
                document.getElementById("wikiTitle").innerHTML = "No articles available for this country";
            } else {
                for (const entry of entries) {
                    const infoType = entry.querySelector("feature").textContent;
                    const title = entry.querySelector("title").textContent;
                    const article = entry.querySelector("summary").textContent;
                    if ((infoType == "country" && title == input) || 
                    (infoType == "country" && title.includes(input))) {
                        $(".card-title").html(title);
                        $(".card-text").html(article);
                        $(".card-img-top").html("");
                        let imgString = entry.querySelector("thumbnailImg").textContent;
                        imgString = imgString.replace("</thumbnailImg>", "");
                        document.getElementById('image1').src = image1;
                        document.getElementById('image2').src = image2;
                        document.getElementById('image3').src = image3;
                        let wikiString = entry.querySelector("wikipediaUrl").textContent;
                        wikiString = wikiString.replace("</wikipediaUrl>", "");
                        document.getElementById('wikilink').href = wikiString;
                    }
                }
            }
        }
    });
};

function news(isoa2, countryname) {
    $("#newsContent").empty();

    $.ajax({
        url: "php/newsAPI.php?country=" + isoa2,
        type: "GET",
        success: function(result){
            $("#newsLocation").html(countryname);
            const resp = JSON.parse(result);
            if (resp.totalResults !== 0) {
                articles = resp.articles;
                for (article of articles) {
                    let str = `<table class="table table-borderless mb-0">       
                    <tr>
                        <td colspan="2">
                        <a href="${article.url}" class="fw-bold fs-6 text-black" target="_blank">${article.title}</a>
                        </td> 
                    </tr>
                    <tr>       
                        <td class="align-bottom pb-0">
                        <p class="fw-light fs-6 mb-1">${article.author}</p>
                        </td>               
                    </tr>
                </table>`;
    
                $("#newsContent").append(str);
            };
            } else {
                let str = `<p>No news available for this country</p>`
                $("#newsContent").append(str);
            }
        }
    });
};

function earthquake(north, east, south, west) {
    earthquakes.clearLayers();

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
                earthquakes.addLayer(marker);
            }
        }
    })
};

function population(iso_a2) {
    $.ajax({
        url: "php/RESTCountries.php?isoa2=" + iso_a2,
        type: "GET",
        success: function(response) {
            const resp = JSON.parse(response);
            $.each(resp[0].languages, function (key, value) {
                $("#langs").append("<span>" + JSON.stringify(value).replace(/"/g,"") + ", " + "</span>");
            });
            $("#population").html(numeral(resp[0].population).format('0,0'));
            $("#demonyms").html(resp[0].demonyms.eng.m);
        }
    })
}