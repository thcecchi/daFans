'use strict';

angular.module('daFansApp')
  .controller('GeolocationCtrl', function ($scope, $http, socket, $geolocation) {
    $scope.message = 'Hello';

    $scope.city

    $geolocation.getCurrentPosition({
        timeout: 60000
     }).then(function(position) {
        $scope.myPosition = position;
        var lat = $scope.myPosition.coords.latitude
        var lng = $scope.myPosition.coords.longitude

        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0')
          .then(function(place) {
            $scope.city = place.data.results[0].address_components[3].short_name
          });
     });

     $geolocation.watchPosition({
          timeout: 60000,
          maximumAge: 250,
          enableHighAccuracy: true
      });
      $scope.myCoords = $geolocation.position.coords; // this is regularly updated
      $scope.myError = $geolocation.position.error;  // this becomes truthy, and has 'code' and 'message' if an error occurs

      // var lat = $scope.myPosition.coords.latitutde
      // var lng = $scope.myPosition.coords.longitude


      //$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0');

  });
