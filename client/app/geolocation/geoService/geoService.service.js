'use strict';

angular.module('daFansApp')
  .service('geoService', function ($rootScope, $http, $geolocation) {

    var getCoords = function (lat, lng) {
      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + '&key=AIzaSyATww0ZsQv9T_wBmqqoVZCL0MNwVsOGaT0')
    }

    return {
      getLocationStats: getCoords
    };

  });
