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

// L.easyButton('fa-crosshairs', function(btn, map){
//     helloPopup.setLatLng(map.getCenter()).openOn(map);
// }).addTo(map);

// L.easyButton.addTo(map);

// let easyButton = L.easyButton("fa-info fa-lg", function (btn, map) {
//     $("#exampleModal").modal("show");
//   }).addTo(map);

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
    // $("#exampleModal").modal("show");
    helloPopup.setLatLng(map.getCenter()).openOn(map);
  }).addTo(map);