var map = L.map('map').setView([42.375, -71.106], 13);

L.tileLayer('http://{s}.tile.cloudmade.com/' + API_KEY + '/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

map.doubleClickZoom.disable();

var circle = L.circle([52.2100, 0.1300], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

var data = [42.373939, -71.119106];

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom"); 

svg.selectAll("circles") 
    .data(data)
.enter().append("circle")
    .attr('class', 'geoChatCircle')
    .attr("cx", 12)
    .attr("cy", 12)
    .attr("r", 6)
    .style("fill", "#ccc")
    .style("stroke", "red")
    .style("stroke-opacity", 1)
    .style("stroke-width", 3);

function project(x) {
  var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
  return [point.x, point.y];
}

