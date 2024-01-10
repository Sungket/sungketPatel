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

  var basemaps = {
    "Streets": streets,
    "Satellite": satellite
  };

  var overlayMaps = {
    "Airports": airports,
    "Universities" : universities,
    "Capital Cities": capitalCities,
    // "Earthquakes": earthquakesList,
  };
  
  let map = L.map("map", {
    layers: [streets, airports, universities, capitalCities, /*earthquakesList*/]
  }).setView([54.5, -4], 6);
  
  var layerControl = L.control.layers(basemaps, overlayMaps).addTo(map);


//easybuttons
L.easyButton("fa-info", function (btn, map) {
    $("#exampleModal").modal("show");
  }).addTo(map);

L.easyButton("fas fa-cloud-sun fa-lg", function (btn, map) {
    $("#weatherModal").modal("show");
}).addTo(map);

L.easyButton("fas fa-temperature-low fa-lg", function (btn, map) {
    $("#weatherForecastModal").modal("show");
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
}});




//below code asks asks browser for location, then sets map with the coords. If location turned off, it pulls details of first country in dropdown list.
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
    } else {
        defaultPosition();
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        //using openCageData to retrieve the iso_a2 of the current location of the browser, then pass into selectedCountry
        // $.ajax({
        //     url: 'php/openCageData.php?lat=' + latitude + "&lng=" + longitude,
        //     type: 'GET',
        //     success: function(output) {
        //         const res = JSON.parse(output);
        //         // console.log(res);
        //         // let currencyName = res.results[0]["annotations"]["currency"]["iso_code"];
        //         // console.log(currencyName);
        //         // iso_a2 = res.results[0]["components"]["ISO_3166-1_alpha-2"];
        //         // console.log(iso_a2);
        //         // currencySymbol = res.results[0]["annotations"]["currency"]["symbol"];
        //         // console.log(currencySymbol);
        //     }
        // });
    };
    
    function defaultPosition() {
        alert("Geolocation blocked by browser.");
        fetchBoundingBox(0)
    }






// iso_a2 is passed in as value argument
function selectedCountry(value) {

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
            let marker = L.marker([lat, long], {icon: cityMarker}).bindPopup(name);
            capitalCities.addLayer(marker);
        }
    });

    $.ajax({
        url: "php/airportsAPI.php?country=" + value,
        type: "GET",
        success: function(result){
            xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            const geonames = xmlDoc.querySelectorAll("geoname");
            for (let i = 0; i < 50; i++){
                const name = geonames[i].querySelector("name").textContent;
                const lat = geonames[i].querySelector("lat").textContent;
                const long = geonames[i].querySelector("lng").textContent;
                let marker = L.marker([lat, long], {icon: airportMarker}).bindPopup(name);
                airports.addLayer(marker);
            }
        }
    });

    $.ajax({
        url: "php/universitiesAPI.php?country=" + value,
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

    fetchOtherInfo(value);
};


function fetchOtherInfo(info) {
    console.log(info);
    //using openCageData to retrieve other data about the location
    $.ajax({
        url: 'php/openCageData.php?countrycode=' + info,
        type: 'GET',
        success: function(output) {
            const res = JSON.parse(output);
            console.log(res);
            // let currencyName = res.results[0]["annotations"]["currency"]["iso_code"];
            // console.log(currencyName);
            // iso_a2 = res.results[0]["components"]["ISO_3166-1_alpha-2"];
            // console.log(iso_a2);
            // currencySymbol = res.results[0]["annotations"]["currency"]["symbol"];
            // console.log(currencySymbol);
        }
    });
};