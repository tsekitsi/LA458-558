// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
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

// Polyline:

var myLine = new L.Polyline([lincoln.getLatLng(), milwaukee.getLatLng()], {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
});

// Polygon:

var myPolygon = L.polygon([
    [40.806122, -96.702701],//[42, -93],
    [44.994636, -96.702701],//[42, -94],
    [44.994636, -87.680689],//[43, -94],
	[40.806122, -87.680689]//[43, -93]
],{
    color: 'yellow',
    fillColor: 'yellow'
});

// Adding controls for baselayers, overlays:

var baseMaps = {
    "Streets": osm,
    "Aerial": esriWorldImagery,
    "Night": NASAGIBS_ViirsEarthAtNight2012
};

var overlayMaps = {
    "Cities": cities,
    "Line": myLine,
    "Polygon": myPolygon
};

L.control.layers(baseMaps, overlayMaps).addTo(map);