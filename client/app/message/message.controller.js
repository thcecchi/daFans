'use strict';

angular.module('daFansApp')
  .controller('MessageCtrl', function ($scope, $http, socket, $geolocation) {
    $scope.allMessages = [];

    $http.get('/api/messages').success(function(allMessages) {
      $scope.allMessages = allMessages;
      socket.syncUpdates('message', $scope.allMessages);
    });

    $scope.addMessage = function() {
      if($scope.newMessage === '') {
        return;
      }
      $http.post('/api/messages', { message: $scope.newMessage,
                                    lat: $geolocation.lat,
                                    lng: $geolocation.lng });
      $scope.newMessage = '';
    };

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });

  });
