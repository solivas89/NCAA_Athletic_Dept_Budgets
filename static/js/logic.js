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
            return "blue";
        case "New York":
            return "orange";
        case "Oregon":
            return "green";
        case "Texas":
            return "purple";
        case "Florida":
                return "red";
        case "Georgia":
                return "blue";
        case "Washington":
                return "orange";
        case "Maryland":
                return "green";
        case "Michigan":
                return "purple";
        case "Iowa":
                return "red";
        case "Minnesota":
                return "blue";
        case "Utah":
                return "orange";
        case "Nebraska":
                return "green";
        case "Mississippi":
                return "purple";
        case "Montana":
                return "red";
        case "Missouri":
                return "blue";
        case "Arkansas":
                return "orange";
        case "Hawaii":
                return "green";
        case "North Carolina":
                return "purple";
        case "Alaska":
                return "red";
        case "Idaho":
                return "blue";
        case "South Carolina":
                return "orange";
        case "Alabama":
                return "green";
        case "South Dakota":
                return "purple";
        case "New Jersey":
                return "red";
        case "Pennsylvania":
                return "blue";
        case "Indiana":
                return "orange";
        case "Vermont":
                return "green";
        case "Maine":
                return "purple";
        case "Oklahoma":
                return "red";
        case "Pennsylvania":
                return "blue";
        case "North Dakota":
                return "orange";
        case "Louisiana":
                return "green";
        case "Nevada":
                return "purple";
        case "New Hampshire":
                return "red";
        case "Massachusetts":
                return "blue";
        case "Rhode Island":
                return "orange";
        case "Connecticut":
                return "green";
        case "Delaware":
                return "purple";
        case "Kansas":
                return "yellow";
        case "New Mexico":
                return "yellow";
        case "Tennessee":
                return "yellow";
        case "West Virginia":
                return "yellow";
        case "Wyoming":
                return "yellow";
        case "Colorado":
                return "red";
        case "Ohio":
                return "red";
        case "Illinois":
                return "green";
        case "Virginia":
                return "red";
        case "Wisconsin":
                return "orange";
        case "Kentucky":
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