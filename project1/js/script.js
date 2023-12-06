var map = L.map('map').setView([51.505, -0.09], 13); 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
    //now returning a JSON object
    const obj = JSON.parse(array);
    for (let i = 0; i < obj.length; i++) {
        $('.dropdown-menu').append('<a class="dropdown-item" href="#" onclick="getBorders(' + i + ')">' + obj[i] + '</a>');
    };
}})


// onchange event handler once user clicks on a country, fetches the border coords
function getBorders(i) {
    $.ajax({type:"GET",
            url: "php/readBorders.php",
            success: function(array){
                const obj = JSON.parse(array);
                console.log(typeof obj);
                console.log(i);
            }})
}

function fetchWeatherInfo() {
    $.ajax({url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=7b964a710daaa3af6d297d5f54bc105d", success: function(result){
        const response = JSON.parse(result);
        console.log(response);
    }})

    $.ajax({url: "utils/countryBorders.geo.json", success: function(res){
        const resp = JSON.parse(res);
        console.log(typeof resp);
    }})
}