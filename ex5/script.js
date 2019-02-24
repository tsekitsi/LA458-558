var map = L.map('map').setView([41.058699, 23.427364], 8);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([41.058699, 23.427364]).addTo(map)
   .bindPopup("Mario's hometown in Greece")
   .openPopup();

var cities = [
    [39.549589, 19.876734, "Corfu, Greece"],
	[40.626377, 22.948359, "Thessaloniki, Greece"],
	[37.971514, 23.726758, "Athens, Greece"],
	[41.890194, 12.492231, "Rome, Italy"],
    [41.008526, 28.980057, "Istanbul, Turkey"]
];

for (var i = 0; i < cities.length; i++) {
	marker = new L.marker([cities[i][0],cities[i][1]])
	.bindPopup(cities[i][2])
	.addTo(map);
}

function fullExtent() {
    map.setView([cities[0][0], cities[0][1]], 5);
}

function ames() {
	map.panTo(new L.LatLng(42.028160, -93.649329));
}

function anoKamila() {
	map.panTo(new L.LatLng(41.058699, 23.427364));
}