var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoiZHVhbmRlbGwiLCJhIjoiY2tmb216c3JvMDN3aDMxbnZnNHhwb2Y0MiJ9.zF8Unq7qaCslKt3nDNpgjw"
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "static/data/UnitedStates.json";
  
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });
  