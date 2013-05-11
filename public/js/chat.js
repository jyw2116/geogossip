

var data = [32, 57, 112],
    w = 400,
    h = 300,
    x = d3.scale.ordinal().domain([57, 32, 112]).rangePoints([0, w], 1),
    y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);

var svg = d3.select("#d3-1")
  .append("svg")
    .attr("width", "400px")
    .attr("height", "300px");


svg.selectAll("circle")
    .data(data)
  .enter().append("circle")
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
      fill: "steelblue",
      stroke: "red"
    };

    $scope.users = [ 
        {name: 'jon', x: 130, y: 130},
        {name: 'jiyeon', x: 150, y: 150}, 
        {name: 'judy', x:159, y: 120}
    ];

    /* watch the $scope.circleProps object for changes, including initialization */
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

    /* watch the $scope.users array for changes, including initialization */
    $scope.$watch('users', function (newVal, oldVal) {
        var users = newVal;
        $scope.plotUsers();
    }, true);

  
    $scope.pulse = function() {
        svg.selectAll("cicle")
            .data(data)
          .enter().append("circle")
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

    $scope.plotUsers = function() {
        svg.selectAll(".nameBubble").remove();
        svg.selectAll(".nameBubble")
          .data($scope.users)
        .enter().append("g")
          .attr("class", "nameBubble")
          .append("text")
          .attr("text-anchor", "middle")
          .text(function(d) {return d.name})
          .attr("x", function(d) {return d.x})
          .attr("y", function(d) {return d.y});
      
    }

    $scope.addUser = function() {
        $scope.users.push({});
    };
}

