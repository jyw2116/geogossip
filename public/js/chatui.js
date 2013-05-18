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
      ]
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
      ]
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
}