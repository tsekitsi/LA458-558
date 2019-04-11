// Initializing two tile layer variables:

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Initializing the map:

var map = L.map('map', {
    center: [51.515, -0.092], //[51.54, -0.052],
    zoom: 14,
    minZoom: 2,
    layers: [osm]
});

// Adding controls for baselayers, overlays:

var baseMaps = {
    "Streets": osm,
    "Aerial": esriWorldImagery
};

// City of London Police Stations. First, create markers, then group:

var police1 = L.marker([51.517704, -0.079960], {icon: L.icon({iconUrl:"assets/p_icon.png", iconSize:[25, 25]})}).bindPopup('City of London Police');
var police2 = L.marker([51.516656, -0.093746], {icon: L.icon({iconUrl:"assets/p_icon.png", iconSize:[25, 25]})}).bindPopup('City of London Police');
var police3 = L.marker([51.517076, -0.102780], {icon: L.icon({iconUrl:"assets/p_icon.png", iconSize:[25, 25]})}).bindPopup('City of London Police');
var police_stations = L.layerGroup([police1, police2, police3]).addTo(map);

// Add heatmap (using the leaflet.heat plugin):

var crime_categories = ["Anti-social behaviour", "Bicycle theft", "Other theft", "Criminal damage and arson", "Drugs", "Vehicle crime", "Public order", "Robbery", "Violence and sexual offences", "Theft from the person", "Possession of weapons", "Burglary", "Shoplifting", "Other crime"];

var crime_intensities = [0.3, 0.2, 0.2, 0.5, 0.7, 0.8, 0.1, 0.7, 0.9, 0.0, 0.4, 0.8, 0.5, 0.3];

var crime_colors = ["#b15e12","#4d5925","#eae4d7","#20cc06","#cae9ab","#80aec5","#d418a6","#cfd216","#275e15","#0e3519","#94f6bd","#6633b1","#9776fb","#d095be"];

//var json_array = $.getJSON('../data/assign3/mygeodata_merged.geojson');

var lat_lng_intensity = [];

function getArray(){
    return $.getJSON('../data/assign3/mygeodata_merged.geojson');
}

getArray().done( function () {
    $.getJSON('../data/assign3/mygeodata_merged.geojson', function (data) {
        var result = data.features;
        for (var i = 0; i < result.length; i++) {
            var intensity_now = 0;
            for (var j = 0; j < crime_categories.length; j++) {
                if (result[i].properties['Crime type'] == crime_categories[j])
                    intensity_now = crime_intensities[j];
            }
            lat_lng_intensity.push([result[i].properties['Latitude'], result[i].properties['Longitude'], intensity_now]);
        }
    });
});

var heat = L.heatLayer(lat_lng_intensity, {radius: 25}).addTo(map);

//console.log(json_array);

var overlayMaps = {
    "Police Stations": police_stations,
    "Heatmap of Crimes": heat
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// Load the data:

var myURL = "https://tsekitsi.github.io/LA458-558/data/assign3/mygeodata_merged.geojson";

function style(feature) {
    var color = "#a0a0a0";
    for (var i = 0; i < crime_categories.length; i++) {
        if (feature.properties['Crime type'] == crime_categories[i])
            color = crime_colors[i];
    }
    return {
        stroke: false,
        fillColor: color,
        weight: 0
    };
}

// Map the points from the GeoJSON:

var geojsonLayer = new L.GeoJSON.AJAX(myURL , {
    style: style,
    pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {
            fillOpacity: 0.66,
            radius: 5
        });
    },

    onEachFeature: function (feature, layer) {
        var month = feature.properties['Month'].toString();
        var location = feature.properties['Location'];
        var type = feature.properties['Crime type'];
        layer.bindPopup(month+"; "+location+"; "+type);
    }
}).addTo(map);

/*
// Create a legend:

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
*/

// HighCharts code:

// totals per crime type for January and February:
var totJan = [92, 29, 144, 18, 44, 20, 23, 7, 72, 31, 5, 22, 74, 5];
var totFeb = [93, 28, 175, 22, 48, 8, 38, 9, 92, 50, 1, 26, 68, 1];

Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Crimes in London per month in 2019'
    },
    subtitle: {
        text: 'Source: <a href="https://data.police.uk">data.police.uk</a>'
    },
    xAxis: {
        categories: ['January', 'February']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of incidents'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.0f}%<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    colors:crime_colors,
    series: [{
        name: 'Anti-social behaviour',
        data: [0.5,0.5]
    }, {
        name: 'Bicycle theft',
        data: [0.5,0.5]
    }, {
        name: 'Other theft',
        data: [0.5,0.5]
    }, {
        name: 'Criminal damage and arson',
        data: [0.5,0.5]
    }, {
        name: 'Drugs',
        data: [0.5,0.5]
    }, {
        name: 'Vehicle crime',
        data: [0.5,0.5]
    }, {
        name: 'Public order',
        data: [0.5,0.5]
    }, {
        name: 'Robbery',
        data: [0.5,0.5]
    }, {
        name: 'Violence and sexual offences',
        data: [0.5,0.5]
    }, {
        name: 'Other crime',
        data: [0.5,0.5]
    }, {
        name: 'Theft from the person',
        data: [0.5,0.5]
    }, {
        name: 'Burglary',
        data: [0.5,0.5]
    }, {
        name: 'Possession of weapons',
        data: [0.5,0.5]
    }, {
        name: 'Shoplifting',
        data: [0.5,0.5]
    }
    ]
});