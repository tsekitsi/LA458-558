var map = L.map('map', {minZoom:15}).setView([42.026494, -93.646457], 16);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var coordinates = [
    [42.0246067, -93.6425986],
    [42.0246067, -93.6429956],
    [42.0244872, -93.6433175],
    [42.0247421, -93.6436822],
    [42.0250528, -93.6436501],
    [42.0253873, -93.6437573],
    [42.0268665, -93.6438142],
    [42.0268672, -93.6440076],
    [42.0270553, -93.6443303],
    [42.0272595, -93.6443338],
    [42.0273788, -93.6444606],
    [42.0273708, -93.6448133],
    [42.0274047, -93.6449635],
    [42.0275848, -93.6452288],
    [42.0277023, -93.6454461],
    [42.0277226, -93.6455839],
    [42.0277214, -93.6463207],
    [42.0277429, -93.6467282],
    [42.0277457, -93.648036],
    [42.0277286, -93.6483573],
    [42.0277294, -93.6494206],
    [42.0279951, -93.6494214],
    [42.0280858, -93.6493487],
    [42.0281223, -93.6493484],
    [42.0281222, -93.6494092]
    ];

var polyline = L.polyline(coordinates, {color: 'red', opacity:0.85}).addTo(map);

polyline.bindTooltip("Mario's path to class");

var circle1 = L.circle([42.027246, -93.648533], {radius: 100, color: '#dd1c77', weight: 0}).addTo(map);

var circle2 = L.circle([42.026178, -93.644946], {radius: 100, color: '#dd1c77', weight: 0}).addTo(map);

var myPoints = [
    [42.025914, -93.649825, "room", "Fav room"],
    [42.024611, -93.642501, "dorm", "Fav dorm"],
    [42.028117, -93.649420, "class", "Fav class"]
    ];

function getColor(s) {
    return  s == "room" ? 'http://www.googlemapsmarkers.com/v1/e41a1c' :
            s == "dorm" ? 'http://www.googlemapsmarkers.com/v1/377eb8' :
            s == "class" ? 'http://www.googlemapsmarkers.com/v1/4daf4a' :
            'http://www.googlemapsmarkers.com/v1/FFFFFF';
}

for (var i = 0; i < myPoints.length; i++) {
    marker = new L.marker([myPoints[i][0],myPoints[i][1]], {
        icon: L.icon({iconUrl: getColor(myPoints[i][2]),iconSize:[10, 17],iconAnchor:[5, 17],popupAnchor:[0, -20]}), title: myPoints[i][3], opacity: 1.0
    }).bindPopup('<b>'+myPoints[i][3]+'</b>').addTo(map);
}

var cirmarker1 = L.circleMarker([42.028592, -93.646500], {fillOpacity	: 1, fillColor: "#762a83", weight: 0, radius: 5}).addTo(map);

var cirmarker2 = L.circleMarker([42.027896, -93.645184], {fillOpacity	: 1, fillColor: "#762a83", weight: 0, radius: 5}).addTo(map);

var cirmarker3 = L.circleMarker([42.029396, -93.648633], {fillOpacity	: 1, fillColor: "#762a83", weight: 0, radius: 5}).addTo(map);

var rectangle = L.rectangle([[42.028696, -93.649327],[42.027588, -93.648204]], {color: "#ff7800", weight: 1}).addTo(map);

rectangle.bindPopup('<b>Parks Library</b>')