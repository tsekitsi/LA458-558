// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Initializing the map:

var map = L.map('map', {
    center: [38.2, 23.6],
    zoom: 7,
    minZoom: 7,
    maxZoom: 12,
    zoomControl: false,
    layers: [esriWorldImagery]
});

// Adding controls for baselayers, overlays:

var baseMaps = {
    "Streets": osm,
    "Aerial": esriWorldImagery
};

L.control.layers(baseMaps).addTo(map);
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

// Dictionary of state names to latlong:
var stateToLatlong = {
    'Achaia': [38.083333, 21.833333],
    'Argolis (Greece)': [37.666667, 22.833333],
    'Arta (Greece)': [39.15, 20.983333],
    'Athens': [37.983972, 23.727806],
    'Attica': [38.083333, 23.5],
    'Attica, Poros': [37.516667, 23.483333],
    'Attiki': [38.083333, 23.5],
    'Chalkida Evia': [38.466667, 23.6],
    'Chania (Greece)': [35.516667, 24.016667],
    'Corfu': [39.583333, 19.866667],
    'Crete': [35.21, 24.91],
    'Elassona': [39.883333, 22.183333],
    'Etolia Akarnania': [38.666667, 21.416667],
    'Gavdos Island': [34.833333, 24.083333],
    'Kalymnos': [36.983333, 26.983333],
    'Karditsa': [39.366667, 21.916667],
    'Kefalonia': [38.249999, 20.499998],
    'Komotini (Greece)': [41.122440, 25.406557],
    'Kreta': [35.21, 24.91],
    'Laggadas (Macedonia Greece)': [40.75, 23.06667],
    'Lamia (Greece)': [38.902790, 22.443008],
    'Larissa': [39.643452, 22.413208],
    'Lasithi': [35.057, 25.794],
    'Lesvos': [39.166666, 26.333332],
    'Macedonia': [40.749997, 22.8999964],
    'Magnesia': [39.3499986, 22.9833294],
    'Melissiatika (Greece)': [38.250546, 22.081095],
    'Mires Crete': [35.341846, 25.148254],
    'Nafpaktos (Greece)': [38.39167, 21.8275],
    'Paros Naxos (Greece)': [37.085644, 25.148832],
    'Patra': [38.246639, 21.734573],
    'Peloponnese': [37.343165294, 22.351331928],
    'Pireaus (Greece)': [37.94745, 23.63708],
    'Pireaus, Περαιώς': [37.94745, 23.63708],
    'Pyrgos (Greece)': [37.6751289, 21.4410191],
    'Rhodes': [36.166666, 28.0],
    'Serres': [41.084666328, 23.543164494],
    'Siatista (Greece)': [40.262, 21.544],
    'Sifnos island': [36.9833294, 24.666664],
    'Sparta': [37.074448, 22.430241],
    'Syros': [37.463493, 24.916088],
    'Thessaloniki': [40.736851, 22.920227],
    'Tirnavos': [39.73778, 22.28917],
    'Trikala (Greece)': [39.55493, 21.76837],
    'amaliada': [37.8, 21.35],
    'Αλεξανδρούπολις (Greece)': [40.849136, 25.879326],
    'Βέροια (Greece)': [40.52437, 22.20242],
    'Βοιωτία': [38.8999964, 22.5333312],
    'Καστοριά': [40.520744, 21.271206],
    'Μαγνησία (Greece)': [39.36103, 22.94248],
    'Ξάνθη': [41.13488, 24.888],
    'Χίος (Greece)': [38.36778, 26.13583]
};

// Url to the api with data in json format:
linkToJSON = 'http://www.radio-browser.info/webservice/json/stations/bycountry/greece';

// Download the data into a json object variable:
var allStations = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': linkToJSON,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); //// https://stackoverflow.com/questions/2177548/load-json-into-variable

// Keep only stations with a registered state and url property:
var fullStations = [];
for (i=0; i<allStations.length; i++) {
    station = allStations[i];
    if ((stateToLatlong[station.state])&&
        (station.url != '')) {
        station['latlng'] = stateToLatlong[station.state];
        fullStations.push(station);
    };
};

for (i=0; i<fullStations.length; i++) {
    console.log(L.latLng(fullStations[i].latlng));
    var marker = new L.CircleMarker(L.latLng(fullStations[i].latlng), {
        fillOpacity: 0.8,
        radius: 2
    });
    marker.addTo(map);
};

/*
var states = {};
for (i=0; i<fullStations.length; i++) {
    station = fullStations[i];
    if (!states[station.state]) {
        states[station.state] = 1;
    } else {
        states[station.state] = states[station.state]+1;
    }
}
console.log(states);
*/