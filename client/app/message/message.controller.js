'use strict';

angular.module('daFansApp')
  .controller('MessageCtrl', function (geoService, $scope, $http, socket, $geolocation, $routeParams, $rootScope, moment) {
    var thisTeam = $routeParams.teamId
    var thisTeamSing = thisTeam.substring(0, thisTeam.length - 1);
    var thisTeamPlur = thisTeam.substr(0, 1).toUpperCase() + thisTeam.substr(1);
    $scope.localMessages = [];
    $scope.team = thisTeamPlur


    $http.get('/api/' + thisTeam).success(function(allMessages) {
      for (var i = 0; i < allMessages.length; i++){
        console.log(allMessages[i].loc)
        if (allMessages[i].loc == $rootScope.city) {
          $scope.localMessages.push(allMessages[i])
        }
      }
      // $scope.allMessages = allMessages;
      socket.syncUpdates(thisTeamSing, $scope.localMessages);
      console.log($scope.localMessages)
    });

    $scope.addMessage = function() {
      if($scope.newMessage === '') {
        return;
      }
      console.log($rootScope.city)
      $http.post('/api/' + thisTeam, { message: $scope.newMessage,
                                       loc: $rootScope.city,
                                       time: new Date()
                                     });
      $scope.newMessage = '';
    };

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });

  });
