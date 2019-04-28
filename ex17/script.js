var mapCenter = L.latLng(41.590833,-93.620833);

var map = L.map('mapid').setView(mapCenter, 11);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var custom = L.tileLayer('https://api.mapbox.com/styles/v1/tseki94/cjv08f3644m7t1fnk1fn4mtxx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHNla2k5NCIsImEiOiJjanYwNm5xcXMxZm4zNDRydjhkMjVhdnZ3In0.1x3fN7rhr9x1nfywnHFpNQ', {
    attribution: 'Mapbox Studio'
}).addTo(map);

var baseMaps = {
    "Default": osm,
    "Custom": custom
};

L.control.layers(baseMaps).addTo(map);