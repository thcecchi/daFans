'use strict';

angular.module('daFansApp')
  .service('geoService', function ($rootScope, $http, $geolocation, $routeParams, socket) {
    var thisTeam = $routeParams.teamId;

    var getCoords = function (lat, lng) {
      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0')
    }

    var findUserLocation = function (thisTeam) {
      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function(position) {
            var lat = position.coords.latitude
            var lng = position.coords.longitude

            getCoords(lat, lng).success(function(data) {
              // $("#loading-screen").addClass('hide')
              $rootScope.city = data.results[0].address_components[3].short_name
              console.log($rootScope.city)
              console.log(thisTeam)
            })
          }).then(function() {
            $http.get('/api/' + thisTeam).success(function(allMessages) {
              var thisTeamSing = thisTeam.substring(0, thisTeam.length - 1);

              $rootScope.arrangeComments(allMessages)
              socket.syncUpdates(thisTeamSing, $rootScope.localMessages)
              console.log($rootScope.localMessages)
            }).finally(function() {
              $("#loading-screen").addClass('hide')
              // $scope.startAtBottom()
            })
          })
    }

    return {
      getLocationStats: getCoords,
      runLocationCheck: findUserLocation
    };

  });
