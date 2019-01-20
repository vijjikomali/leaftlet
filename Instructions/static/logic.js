var API_quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
console.log (API_quakes)
var API_plates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
console.log (API_plates)

function markerSize(magnitude) {
    return magnitude * 3;
};


var earthquakes = new L.LayerGroup();

d3.json(API_quakes, function (geoJson) {
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 2.5,
                weight: 0.3,
                color: 'black'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakes);
    createMap(earthquakes);
});

var plateBoundary = new L.LayerGroup();

d3.json(API_plates, function (geoJson) {
    L.geoJSON(geoJson.features, {
        style: function (geoJsonFeature) {
            return {
                weight: 2,
                color: 'Red'
            }
        },
    }).addTo(plateBoundary);
})



// function getColor(mag) {
//     return mag > 5  ? '#b7f34d' :
//            mag > 4  ? '#e1f34d' :
//            mag > 3  ? '#f3db4d' :
//            mag > 2  ? '#f3ba4d' :
//            mag > 1  ? '#f0a76b' :
//                       '#f06b6b';
// }
// Hex Colors for Homework:
// #b7f34d
// #e1f34d
// #f3db4d
// #f3ba4d
// #f0a76b
// #f06b6b

   function Color(magnitude) {
        if (magnitude > 6.5) {
            return '#f06b6b'
        } else if (magnitude > 5) {
            return '#f0a76b'
        } else if (magnitude > 4) {
            return '#f3ba4d'
        } else if (magnitude > 3) {
            return '#f3db4d'
        } else if (magnitude > 2.5) {
            return '#e1f34d'
        } else {
            return '#b7f34d'
    }
   };

function createMap() {

    var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.satellite',
        // accessToken = API_KEY
        accessToken: 'pk.eyJ1Ijoidmlqamlrb21hbGkiLCJhIjoiY2pxbWpyeXAzMDJsZDN5b2N0djZ2MzE0cSJ9.dWayph2vNAy2-8OI94a8UA'
    });

    var streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        // accessToken = API_KEY
        accessToken: 'pk.eyJ1Ijoidmlqamlrb21hbGkiLCJhIjoiY2pxbWpyeXAzMDJsZDN5b2N0djZ2MzE0cSJ9.dWayph2vNAy2-8OI94a8UA'
    });

    var highContrastMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.high-contrast',
        // accessToken = API_KEY
        accessToken:  'pk.eyJ1Ijoidmlqamlrb21hbGkiLCJhIjoiY2pxbWpyeXAzMDJsZDN5b2N0djZ2MzE0cSJ9.dWayph2vNAy2-8OI94a8UA'   
    });
    // var streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     // accessToken = API_KEY
    //     accessToken: 'pk.eyJ1Ijoidmlqamlrb21hbGkiLCJhIjoiY2pxbWpyeXAzMDJsZDN5b2N0djZ2MzE0cSJ9.dWayph2vNAy2-8OI94a8UA'
    // });

    var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        // accessToken = API_KEY
        accessToken: 'pk.eyJ1Ijoidmlqamlrb21hbGkiLCJhIjoiY2pxbWpyeXAzMDJsZDN5b2N0djZ2MzE0cSJ9.dWayph2vNAy2-8OI94a8UA'
    });


    // var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.satellite',
    //     // accessToken = API_KEY
    //     accessToken: 'pk.eyJ1Ijoidmlqamlrb21hbGkiLCJhIjoiY2pxbWpyeXAzMDJsZDN5b2N0djZ2MzE0cSJ9.dWayph2vNAy2-8OI94a8UA'
    // });


    

    var overlays = {
        "High Contrast": highContrastMap,
        "Street": streetMap,
        "Dark": darkMap,
        "Satellite": satellite
        
    };

    var baseLayers = {
        "Earthquakes": earthquakes,
        "Plate Boundaries": plateBoundary,
    };

    var mymap = L.map('mymap', {
        center: [37.0902, -95.7129],
        zoom: 3.9,
        
        layers: [plateBoundary, earthquakes, streetMap]
    });

    L.control.layers(baseLayers, overlays).addTo(mymap);


// this is originial legend//
// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 1, 2.5, 3, 4, 5, 6, 8],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);
    
// plate legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitude = [0, 1, 2.5, 3, 4, 5, 6.5],
            labels = ["Minor","Light","Moderate","Strong","Major","Intensive"];

        div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
                '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }

        return div;
    };
        legend.addTo(mymap);

 
  // Adding legend to the map
  legend.addTo(myMap);

}
