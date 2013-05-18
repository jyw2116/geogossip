var map = L.map('map', { dragging: false,
                         zoomControl: false, 
                         zoomAnimation: false,
                         scrollWheelZoom: false,
                         doubleClickZoom: false,
                         touchZoom: false
                       }).setView([42.375, -71.106], 13);


L.tileLayer('http://{s}.tile.cloudmade.com/' + API_KEY + '/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);


map.doubleClickZoom.disable();

var svg = d3.select(map.getPanes().overlayPane).append("svg").attr('class', 'myMapOverlay'),
    g = svg.append("g").attr("class", "leaflet-zoom"); 

function project(x) {
  var point = map.latLngToLayerPoint(new L.LatLng(x[0], x[1]));
  return [point.x, point.y];
}

function channelsWithLocations(x){
  return (!!x.latLng);
}

function ChatUICtrl ($scope, $http) {
  $scope.channels = [
    {
      topic: "Best icecream @ JP Licks",
      messages: [
        {
          name: "Dan",
          message: "hey everyone"
        },
        {
          name: "Jon",
          message: "I like icecream and waffles!"
        }
      ],
      latLng: null
    },
    {
      topic: "Nemes @ Middle east!",
      messages: [
        {
          name: "Jen",
          message: "hey everyone"
        },
        {
          name: "Judy",
          message: "I like strawberries!"
        }
      ],
      latLng: [42.373939, -71.119106]
    }
  ];

  $scope.activeChannel = $scope.channels[0];
  $scope.activeChannelIdx = 0;
  $scope.selectChannel = function(idx){
    $scope.activeChannel = $scope.channels[idx];
    $scope.activeChannelIdx = idx;
    console.log("active channel is: " + $scope.activeChannel.topic);
  };

  $scope.addMessage = function(msg){
    console.log("running addMessage");
    $scope.activeChannel.messages.push({
      name: "Anon",
      message: $scope.newMessage
    });

    $scope.newMessage = "";
  };

  $scope.channelClass = function(idx){
    if(idx === $scope.activeChannelIdx){
      return "channel_active";
    }
    else{
      return "";
    }
  }

  $scope.createTopic = function () {
    console.log("running createTopic");
    $scope.channels.push({
      topic: $scope.newTopicName,
      messages:[]
    })
    $scope.newTopicName = "";
  }

  $scope.populateMap = function (){
    var xs = $.grep($scope.channels, channelsWithLocations);
    console.log("running drawMap");
    console.log(xs);
    svg.selectAll('circle').remove();
    svg.selectAll("circle") 
    .data(xs)
    .enter().append("circle")
    .attr('class', 'geoChatCircle')
    .attr("cx", function(d) {
      console.log(d.latLng);
      console.log(project(d.latLng));
      return (project(d.latLng)[0]);
    })
    .attr("cy", function(d) {return (project(d.latLng)[1])})
    .attr("r", 12)
    .style("fill", "#f03")
    .style('fill-opacity', 0.3)
    .style("stroke", "red")
    .style("stroke-opacity", 1)
    .style("stroke-width", 3);
  }

  $scope.populateMap();

  map.on('click', function (e) {
    var latLng = [e.latlng.lat, e.latlng.lng];
    console.log(latLng);
    var newChannel = {
      topic: "some topic",
      messages: [],
      latLng: latLng
    };
    $scope.channels.push(newChannel);
    console.log($scope.channels);

    $scope.$apply();
    $scope.populateMap();

  });

}