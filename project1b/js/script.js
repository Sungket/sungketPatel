//run preloader
$(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function() {
            $(this).remove()
        });
    }
});


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



//populate the select dropdown
$.ajax({type:"GET", 
url: "php/readCountryBordersGeoJSON.php", 
success: function(array){
    const obj = JSON.parse(array);
    for (let i = 0; i < obj.length; i++) {
        // $('#countrySelect').append('<option value="' + i + '" onclick="fetchBoundingBox(' + i + ')">' + obj[i].name + '</option>');
        // $('.form-control').append('<option value="' + i + '">' + obj[i].name + '</option>');
        // $("#countrySelect").append('<option>' + obj[i].name + '</option>');


        // let optionText = obj[i].name;
        // let optionValue = i;
        // $('#countrySelect').append('<option>'+obj[i].name+'</option>');

        let option = document.createElement("option");
        option.text = obj[i].name;
        option.value = i;
        $(".form-select").append(option);


        // const countryObj = {name: obj[i].name, iso_a2: obj[i].iso_a2, idx: i};
        // countryArray.push(countryObj);
    };
}});


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
            url: 'php/openCageData.php?lat=' + latitude + "&lng=" + longitude,
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
    
    function defaultPosition() {
        alert("Geolocation blocked by browser.");
        fetchBoundingBox(0)
    }

function test(value) {
    console.log(`value passed in through jquery and html is: ${value}`);
};