'use strict';

angular.module('daFansApp')
  .controller('MessageCtrl', function (geoService, $scope, $http, socket, $geolocation, $routeParams, $rootScope) {
    var thisTeam = $routeParams.teamId
    var thisTeamSing = thisTeam.substring(0, thisTeam.length - 1);
    $scope.localMessages = [];
    $scope.team = thisTeam
    console.log($rootScope.city)
    console.log($scope.team)
    console.log(thisTeamSing)

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
                                       loc: $rootScope.city
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
