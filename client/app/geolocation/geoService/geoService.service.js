'use strict';

angular.module('daFansApp')
  .service('geoService', function ($rootScope, $http, $geolocation) {
    var locationCall = function () {

      var lat
      var lng

      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function(position) {
            $rootScope.myPosition = position;
            lat = $rootScope.myPosition.coords.latitude
            lng = $rootScope.myPosition.coords.longitude
          }).then( function(){
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0')
              .then(function(place) {
                console.log(place)
                $rootScope.city = place.data.results[0].address_components[3].short_name
             });
        });
     };

     return {
      getLocationStats: locationCall
    };
    
  });
