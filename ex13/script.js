// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

// Initializing the map:

var map = L.map('map', {
    center: [20.390431, 78.486835],
    zoom: 4,
    minZoom: 2,
    layers: [osm]
});

// Loading the data:

// 1. The variable name technique:

L.geoJSON(northCities).addTo(map);

// 2. The AJAX technique:

var myURL = "https://tsekitsi.github.io/LA458-558/ex13/southIndianCities.geojson";

function style(feature) {
    return {
        stroke: false,
        fillColor: ((feature.properties.ProgressedToQuartFin > 0) ? '#1a9850' : '#d73027'),
        weight: 0
    };
}

var geojsonLayer = new L.GeoJSON.AJAX(myURL).addTo(map);