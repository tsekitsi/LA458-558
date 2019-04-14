// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

// Initializing the map:

var map = L.map('map', {
    center: [17.390431, 78.486835],
    zoom: 4,
    minZoom: 2,
    layers: [osm]
});

// Loading the data:

var myURL = "https://tsekitsi.github.io/LA458-558/ex13/southIndianCities.geojson";

function style(feature) {
    return {
        stroke: false,
        fillColor: ((feature.properties.ProgressedToQuartFin > 0) ? '#1a9850' : '#d73027'),
        weight: 0
    };
}

var geojsonLayer = new L.GeoJSON.AJAX(myURL , {
    style: style,
    pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {
            fillOpacity: 0.8,
            radius: feature.properties.NumTitles + 2
        });
    },

    onEachFeature: function (feature, layer) {
        htmlText = "<strong>" + feature.properties.ClubName + "</strong>" + "<div class='centered' style='margin-top:7px'>" + "<img alt='Cannot load logo image...' src='" + feature.properties.LogoURL + "' width='100'>" + "</div>";
        layer.bindPopup(htmlText);
        var pos = feature.properties.GroupFinish;
        var stOrNd = ((pos > 1) ? 'nd' : 'st');
        textForTooltip = feature.properties.ClubName + " finished " + pos + stOrNd + " in their group this season.";
		layer.bindTooltip(textForTooltip);
    }
}).addTo(map);