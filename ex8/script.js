// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var map = L.map('map', {
    center: [48.246114, 2.331950],
    zoom: 4,
    layers: [osm]
});

// Adding controls for baselayers, overlays:

var baseMaps = {
    "Streets": osm,
    "Aerial": esriWorldImagery
};

L.control.layers(baseMaps).addTo(map);

var myURL = "https://tsekitsi.github.io/LA458-558/data/ex8/last16.geojson";

var geojsonLayer = new L.GeoJSON.AJAX(myURL , {
    pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {
            stroke: true,
            weight: 0,
            color: '#000000',
            opacity: 1.0,
            fillColor: 'red',
            fillOpacity: 0.7,
            radius: feature.properties.NumTitles + 2
        });
    },

    onEachFeature: function (feature, layer) {
        htmlText = "<strong>" + feature.properties.ClubName + "</strong>" + "<div class='centered'>" + "<img src='" + feature.properties.LogoURL + "' width='100'>" + "</div>";
        layer.bindPopup(htmlText);
        var pos = feature.properties.GroupFinish;
        var stOrNd = ((pos > 1) ? 'nd' : 'st');
        textForTooltip = feature.properties.ClubName + " finished " + pos + stOrNd + " in their group this season.";
		layer.bindTooltip(textForTooltip);
    }
}).addTo(map);