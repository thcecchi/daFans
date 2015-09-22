'use strict';

angular.module('daFansApp')
  .controller('MessageCtrl', function ($scope, $http, socket, $geolocation, $routeParams) {
    $scope.allMessages = [];
    var thisTeam = $routeParams.teamId

    console.log(thisTeam)

    $http.get('/api/' + thisTeam).success(function(allMessages) {
      $scope.allMessages = allMessages;
      socket.syncUpdates('message', $scope.allMessages);
      console.log(allMessages)
    });

    $scope.addMessage = function() {
      if($scope.newMessage === '') {
        return;
      }
      console.log($geolocation.city)
      $http.post('/api/messages', { message: $scope.newMessage,
                                    loc: this//input city or lat/lng
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
