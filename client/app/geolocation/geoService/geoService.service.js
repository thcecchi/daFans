'use strict';

angular.module('daFansApp')
  .service('geoService', function ($rootScope, $http, $geolocation) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    $geolocation.watchPosition({
         timeout: 60000,
         maximumAge: 250,
         enableHighAccuracy: true
     });

     $rootScope.myCoords = $geolocation.position.coords; // this is regularly updated
     $rootScope.myError = $geolocation.position.error;  // this becomes truthy, and has 'code' and 'message' if an error occurs

     console.log(Object.keys($geolocation.position))

    var getLocation = function () {
      getCoords()
      console.log(myCoords)
      var lat = $geolocation.position.coords.latitude
      var lat = $geolocation.position.coords.longitude
      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0')
        .then(function(place) {
          $scope.city = place.data.results[0].address_components[3].short_name
        });
     };

     return {
      getLocationStats: getLocation
      // totalAllCart: cartTotal
    };
  });
