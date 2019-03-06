// initializing map:
var map = L.map('map', {
    center: [39.061702, -105.569805],
    zoom: 6,
    minZoom: 4,
    maxZoom: 8,
    doubleClickZoom: false
});

// initializing and adding baselayer:
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// bounds of Colorado:
var maxY = 41.002360;
var minY = 36.999075;
var maxX = -109.045229;
var minX = -102.051717;

// declaring randMarker:
var randMarker;
var fav_Marker;
var last_Fav;

// declaring (and adding to map) FeatureGroup traces:
var traces = L.featureGroup().addTo(map);

// options for the trace circle markers:
var rad = 5;
var wgt = 0;
var col = '#354547';
var opa = 0.5;

// initializng boolean trace to false:
var trace = false;

function addRandMarker() {
    // generate random coordinates within the bounds of Colorado:
    var y = Math.random() * (maxY - minY) + minY;
    var x = Math.random() * (maxX - minX) + minX;
    // remove any previous random marker:
    if (randMarker) {
        // leave trace if checked:
        if (trace) {
            var c = randMarker.getLatLng();
            var newCirc = new L.circleMarker(c, {fillOpacity: opa, fillColor: col, weight: wgt, radius: rad}).bindPopup(c.toString().slice(6));
            newCirc.addTo(traces);
            newCirc.openPopup();
        }
        map.removeLayer(randMarker);
    }
    // create marker on these coordinates and add it to map:
    var latlngNow = new L.latLng(y,x)
    randMarker = new L.marker(latlngNow, {icon: L.icon({iconUrl:'http://www.googlemapsmarkers.com/v1/4daf4a',iconSize:[15, 25],iconAnchor:[7, 25],popupAnchor:[0, -20]}), title: latlngNow.toString().slice(6)}).addTo(map);
    randMarker.on('click', function() {
        this.setIcon(L.icon({iconUrl:'http://www.googlemapsmarkers.com/v1/f44242',iconSize:[15, 25],iconAnchor:[7, 25],popupAnchor:[0, -20]}));
        if (fav_Marker) {
            last_Fav = fav_Marker;
        }
        fav_Marker = randMarker;
    });
}

// updates boolean according to checkbox state:
$('#toggleLeaveTrace').change(function(){
    trace = this.checked;
});

// pan to Corfu, Greece:
function panToCorfu() {
	map.panTo(new L.LatLng(39.549589, 19.876734));
}

function setToColorado() {
	map.setView(new L.LatLng(39.061702, -105.569805));
}

// resets and erases all:
function resetView() {
	map.setView(new L.LatLng(39.061702, -105.569805), 6);
    if (randMarker) {
         map.removeLayer(randMarker);
    }
    if (traces) {
        map.removeLayer(traces);
        traces = L.featureGroup().addTo(map);
        document.getElementById("toggleLeaveTrace").checked = false;
        trace = false;
    }
}

// Report num of traced (circle) markers:
map.on('keypress', function() {
    document.getElementById("display_").innerHTML = "&nbsp"+traces.getLayers().length+"&nbsp";
});

// On double click, pan to last fav marker:
map.on('dblclick', function() {
    if (last_Fav) {
        console.log(last_Fav.getLatLng());
        map.panTo(last_Fav.getLatLng());
    }
});