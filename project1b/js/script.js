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
  var basemaps = {
    "Streets": streets,
    "Satellite": satellite
  };
  
  var map = L.map("map", {
    layers: [streets]
  }).setView([54.5, -4], 6);
  
  var layerControl = L.control.layers(basemaps).addTo(map);
  
  L.easyButton("fa-info", function (btn, map) {
    $("#exampleModal").modal("show");
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




//below code asks asks browser for location, then sets map with the coords. 
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
    } else {
        defaultPosition();
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        //using openCageData to retrieve the iso_a2 of the current location of the browser, then pass into selectedCountry
        $.ajax({
            url: 'php/openCageData.php?lat=' + latitude + "&lng=" + longitude,
            type: 'GET',
            success: function(output) {
                const res = JSON.parse(output);
                // console.log(res);
                // let currencyName = res.results[0]["annotations"]["currency"]["iso_code"];
                // console.log(currencyName);
                // iso_a2 = res.results[0]["components"]["ISO_3166-1_alpha-2"];
                // console.log(iso_a2);
                // currencySymbol = res.results[0]["annotations"]["currency"]["symbol"];
                // console.log(currencySymbol);
            }
        });
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

    $.ajax({
        url: "php/readCountryBorders.php", 
        type:"POST",
        data: {value: value},
        success: function(output) {
            const result = JSON.parse(output);
            border = L.geoJSON(result);
            border.addTo(map);
        }
    });

    
};