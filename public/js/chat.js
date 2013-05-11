



var data = [32, 57, 112],
    dataEnter = data.concat(293),
    dataExit = data.slice(0, 2),
    w = 400,
    h = 300,
    x = d3.scale.ordinal().domain([57, 32, 112]).rangePoints([0, w], 1),
    y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);

var svg = d3.select("#d3-1")
  .append("svg")
    .attr("width", "400px")
    .attr("height", "300px")
    .attr("background-color", "red");

svg.selectAll("circle")
    .data(data)
  .enter().append("circle")
    .attr("class", "little")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 12)
    .style("fill", "#ccc")
    .style("stroke", "red")
    .style("stroke-opacity", 1e-6)
    .style("stroke-width", 3);



/* Angular.js controller for the page */

function ChatCtrl($scope, $http) {
    
    $scope.circleProps = { 
      radius:  12, 
      fill: "#CCC",
      stroke: "red"
    };

    $scope.$watch('circleProps.radius', function (newVal, oldVal) {
        if (parseInt(newVal) > 0) {
          svg.selectAll("circle").attr("r", newVal);
        }
    });
    $scope.$watch('circleProps.fill', function (newVal, oldVal) {
        svg.selectAll("circle").style("fill", newVal);
    });
    $scope.$watch('circleProps.stroke', function (newVal, oldVal) {
        svg.selectAll("circle").style("stroke", newVal);
    });

  
    $scope.pulse = function() {

      svg.selectAll("cicle")
          .data(data)
        .enter().append("circle")
          .attr("class", "select")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", $scope.circleProps.radius * 3)
          .style("fill", "none")
          .style("stroke", $scope.circleProps.stroke)
          .style("stroke-opacity", 1e-6)
          .style("stroke-width", 3)
        .transition()
          .duration(750)
          .attr("r", $scope.circleProps.radius)
          .style("stroke-opacity", 1);


    }
}

