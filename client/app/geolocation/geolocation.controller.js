'use strict';

angular.module('daFansApp')
  .controller('GeolocationCtrl', function ($scope, $http, socket, $geolocation) {
    $scope.message = 'Hello';

    $scope.city
     var lat
     var lng

    $geolocation.getCurrentPosition({
        timeout: 60000
     }).then(function(position) {
        $scope.myPosition = position;
        lat = $scope.myPosition.coords.latitude
        lng = $scope.myPosition.coords.longitude

        var n = arePointsNear(testLocation, userLocation, 10);
        console.log(n);


        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0')
          .then(function(place) {
            $scope.city = place.data.results[0].address_components[3].short_name
          });
     });
         // //////////////////////////////////////

     var arePointsNear = function(checkPoint, centerPoint, km) {
       var ky = 40000 / 360;
       var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
       var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
       var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
       return Math.sqrt(dx * dx + dy * dy) <= km;
     }

        var testLocation = { lat: 32.789674, lng: -79.947939 };
        var userLocation = { lat: lat, lng: lng };

        // var n = arePointsNear(vasteras, userLocation, 10);
        //
        // console.log(n);

         // //////////////////////////////////////

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
