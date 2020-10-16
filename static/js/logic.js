// // Define variables for tile layers
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});
var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});
// NBA & NFL CSV Variables
var nbaLink = "static/data/nba_cleaned.csv"
var nflLink = "static/data/nfl_cleaned.csv"
function markerSize(count) {
  return count * 7000;
}
d3.csv(nbaLink).then(function(data) {
  
  // console.log(data);
  data.forEach(function(data){
    data.count = +data.count,
    data.latitude = +data.latitude,
    data.longitude = +data.longitude
  }) 
  // console.log(data)
  // Define arrays to hold created baseball and football markers
  var basketballMarkers = [];
  var footballMarkers = [];
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < data.length; i++) {
    
    // console.log(data[i].latitude)
    var coordinates = [data[i].latitude, data[i].longitude]
//     console.log(coordinates)
    var playerCount = [data[i].count]
//     console.log(playerCount)
    basketballMarkers.push(
      L.circle(coordinates, {
        fillOpacity: 0.50,
        color: "purple",
        fillColor: "purple",
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: markerSize(playerCount)
      }).bindPopup("<h1>" + data[i].school + "</h1> <hr> <h3>Player Count: " + playerCount + "</h3>")
    );
  }
  d3.csv(nflLink).then(function(data1) {
    // console.log(data1)
    data1.forEach(function(data1){
      data1.count = +data1.count,
      data1.latitude = +data1.latitude,
      data1.longitude = +data1.longitude
    })
//     console.log(data1)
    // Loop through the cities array and create one marker for each city object
    for (var i = 0; i < data.length; i++) {
      
      // console.log(data[i].latitude)
      var coordinates1 = [data1[i].latitude, data1[i].longitude]
      // console.log(coordinates1)
      var playerCount1 = [data1[i].count]
      // console.log(playerCount1)
      // console.log(footballMarkers)
      footballMarkers.push(
        L.circle(coordinates1, {
          fillOpacity: 0.50,
          color: "blue",
          fillColor: "blue",
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its population
          radius: markerSize(playerCount1)
        }).bindPopup("<h1>" + data1[i].college + "</h1> <hr> <h3>Player Count: " + playerCount1 + "</h3>")
      );
    }    
    // need to set up legend here
    // Initialize & Create Two Separate LayerGroups: Basketball & Football
      var basketballLayer = L.layerGroup(basketballMarkers);
      var footballLayer = L.layerGroup(footballMarkers);
  
      // // Create Overlay Object to Hold Overlay Layers
      var overlayMaps = {
        Basketball: basketballLayer,
        Football: footballLayer,
      };
        // // Set the initial map view
        var myMap = L.map("map",{
          center: [39.8283, -98.5795],
          zoom: 4.25,
          layers: [darkMap, basketballLayer]
        });
          // // Define baseMaps Object to Hold Base Layers
      var baseMaps = {
        "Dark": darkMap,
        "Satellite": satelliteMap,
        "Streets": streetMap
      };
      // // Create the layer control w/ basemaps and overlaymaps and add to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
  });
});