var myMap = L.map("map",{
    center: [39.8283, -98.5795],
    zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var link = "static/data/UnitedStates.geojson"

d3.json(link, function(data){
    L.geoJson(data).addTo(myMap)
});

// var mapStyle={
//     color: "white",
//     fillColor: "pink",
//     fillOppacity: 05,
//     weight: 1.5
// };

function chooseColor(NAME){
    switch (NAME){
        case "California":
            return "red";
        case "Arizona":
            return "green";
        case "Manhattan":
            return "orange";
        case "Queens":
            return "green";
        case "Staten Island":
            return "purple";
        default:
            return "black";
    }
}

// d3.json(link, function(data){
//     L.geoJson(data,{
//         style: function(feature){
//             return{
//                 color: "white",
//                 fillColor: chooseColor(feature.properties.borough),
//                 fillOppacity: 0.5,
//                 weight: 1.5
//             }
//         }
//     }).addTo(myMap)
// });

d3.json(link, function(data){
    L.geoJson(data,{
        style: function(feature){
            return{
                color: "white",
                fillColor: chooseColor(feature.properties.NAME),
                fillOpacity: 0.40,
                weight: 1.5
            }
        },
        onEachFeature: function(feature, layer){
            layer.on({
                mouseover: function(event){
                    layer= event.target;
                    layer.setStyle({
                        fillOpacity:0.8
                    });
                },
                mouseout: function(event){
                    layer= event.target;
                    layer.setStyle({
                        fillOpacity:0.5
                    })
                },
                click: function(event){
                    myMap.fitBounds(event.target.getBounds())
                } 
                
            });
            layer.bindPopup("<h1>" +feature.properties.NAME + "</h1>")
        }
    }).addTo(myMap)
})