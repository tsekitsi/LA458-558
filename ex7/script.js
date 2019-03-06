// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Intializing and grouping marker layers for cities:

var dsm = L.marker([41.603956, -93.660146]).bindPopup('Des Moines, IA');
var minneapolis = L.marker([44.994636, -93.276418]).bindPopup('Minneapolis, MN');
var chicago = L.marker([41.875588, -87.680689]).bindPopup('Chicago, IL');
var milwaukee = L.marker([43.030576, -87.926803]).bindPopup('Milwaukee, WI');
var madison = L.marker([43.066016, -89.404290]).bindPopup('Madison, WI');
var lincoln = L.marker([40.806122, -96.702701]).bindPopup('Lincoln, NE');
var cities = L.layerGroup([dsm, minneapolis, chicago, milwaukee, madison, lincoln]);

var map = L.map('map', {
    center: [43.094426, -92.173382],
    zoom: 6,
    layers: [osm, cities]
});

// Adding control to switch baselayers, toggle markers' display:

var baseMaps = {
    "Streets": osm,
    "Satellite": esriWorldImagery
};

var overlayMaps = {
    "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);