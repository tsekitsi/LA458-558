console.clear();
//note that http://icons.webtoolhub.com/icon-p4s2023-set.aspx  used for the green icon source.

//JSON of the line
var myLine = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
              // 1. MODIFIED THE COORDINATES OF THE LINE, WHICH CHANGED THE CALCULATED DISTANCE (5.33 mi from 5.16 mi).
            -93.62933001708984,
            42.01
          ],
          [
            -93.66342544555664,
            42.0126981005257
          ],
          [
            -93.63853454589844,
            41.98960848263661
          ],
          [
            -93.62892150878906,
            42.01052981889534
          ]
        ]
      }
    }
  ]
};


//JSON of the Polygon
var myPolygon = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -93.65861892700195,
              41.96485119205757
            ],
            [
                // 2. MODIFIED THE COORDINATES OF THE RECTANGLE, WHICH CHANGED THE CALCULATED AREA (3 sq mi from 1 sq mi).
              -93.6,
              41.96485119205757
            ],
            [
              -93.6,
              41.97940045674709
            ],
            [
              -93.65861892700195,
              41.97940045674709
            ],
            [
              -93.65861892700195,
              41.96485119205757
            ]
          ]
        ]
      }
    }
  ]
};



//Calculate the length of the polyline in miles
// 3. CHANGED THE 2ND ARGUMENT TO TURF.LINEDISTANCE TO OUTPUT IN METERS.
var length = turf.lineDistance(myLine, 'meters');
console.log("myLine = "+ length + " meters");



//calculates the area of the mPolygon in sq meters and sq miles
var area = turf.area(myPolygon);
	console.log(area + " sq meters");
	console.log(area * 0.000000386102158542 + " sq miles");
	

//The green marker point on the map
var myPoint = {
  "type": "Feature",
  "properties": {
    "marker-color": "#0f0"
  },
  "geometry": {
    "type": "Point",
      // 4. CHANGED THE COORDINATES OF MYPOINT TO MODIFY THE OUTPUT OF TURF.NEAREST.
    "coordinates": [-93.6,40.00]  //change to 42.05 to cover blue marker and the closest white circle will change
  }
};


//these are the three white circle markers
var myPointCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
		  id: 1
	  },
      "geometry": {
        "type": "Point",
        "coordinates": [-93.68,
              41.98]
      }
    },
      // 5. COMMENTED OUT POINT 2 TO CHANGE THE RESULT OF TURF.NEAREST.
      /*{
      "type": "Feature",
      "properties": {
		  		  id: 2
	  },
      "geometry": {
        "type": "Point",
        "coordinates": [-93.57,
              42.0145]
      }
    },*/{
      "type": "Feature",
      "properties": {
		  		  id: 3
	  },
      "geometry": {
        "type": "Point",
        "coordinates": [-93.64,
              42.04]
      }
    }
  ]
};




//This calculation is geodesic distance of the white circle that is closest to the green marker.
var nearest = turf.nearest(myPoint, myPointCollection);

var nearestID = nearest.properties.id;

console.log(nearest.properties.id);









	


//*****************
var mapCenter = L.latLng(42.05,-93.6);

	
var map = L.map('mapid').setView(mapCenter, 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: ''
	}).addTo(map);

var mapCenterMarker = L.marker(mapCenter).addTo(map);

var myStyle = {
    "color": "green",
    "weight": 3,
    "opacity": 0.65
};


var myPointIcon = L.icon({
		iconUrl: 'https://profseeger.github.io/LA558/images/chartreuseMapMarker.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		//popupAnchor: [0, -28]
	});

startPoint =  L.geoJSON(myPoint, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: myPointIcon});
		},
		//onEachFeature: onEachFeature
	}).addTo(map);


L.geoJSON(myLine, {
    style: myStyle
}).addTo(map);


L.geoJSON(myPolygon, {
    style: myStyle
}).addTo(map);


//if the ID of the item identified as being the nearest matches d, then change color of item to orange.
function getColor(d) {
    return d == nearestID ? 'orange' :
                'white';
}

var geojsonMarkerOptions = {
    radius: 7,
    //fillColor: "white",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

L.geoJSON(myPointCollection, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
	style: function(feature) {
	console.log(feature.properties.id);//note this is how you access contents of the id within L.geoJson
		return {
					//radius: some property from geojson,
					fillColor: getColor(feature.properties.id)
				};
			},
			onEachFeature: function (feature, layer) {
				layer.bindPopup("ID: "+feature.properties.id);
			}
	
}).addTo(map);
