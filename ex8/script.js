// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Initializing the map:

var map = L.map('map', {
    center: [48.246114, 2.331950],
    zoom: 4,
    minZoom: 2,
    layers: [osm]
});

// Adding controls for baselayers, overlays:

var baseMaps = {
    "Streets": osm,
    "Aerial": esriWorldImagery
};

L.control.layers(baseMaps).addTo(map);

// Loading the data:

var myURL = "https://tsekitsi.github.io/LA458-558/data/ex8/last16.geojson";

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

// Creatng a legend:
var legend = L.control({
    position: 'bottomleft'
});

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend'),
        vals = [0,1],
        labels = ['Eliminated', 'Progressed'];
    
    div.innerHTML += "<b>Round of 16 Result:</b><br>";
    
    for (var i = 0; i < vals.length; i++) {
    div.innerHTML +=
      '<i style="background:' + ((vals[i] > 0) ? '#1a9850' : '#d73027') + ' ">&nbsp;&nbsp;&nbsp;&nbsp;</i> ' + labels[i]+'<br>';
  }

  return div;
};
legend.addTo(map);