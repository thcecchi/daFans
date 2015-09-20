'use strict';

angular.module('daFansApp')
  .controller('GeolocationCtrl', function (geoService, $scope, $http, socket, $geolocation) {
    var geo = this

    $geolocation.getCurrentPosition({
      timeout: 60000
    }).then(function(position) {
          geo.lat = position.coords.latitude
          geo.lng = position.coords.longitude

          geoService.getLocationStats(geo.lat, geo.lng).success(function(data) {
              $scope.city = data.results[0].address_components[3].short_name
          })
        })

     var arePointsNear = function(checkPoint, centerPoint, km) {
       var ky = 40000 / 360;
       var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
       var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
       var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
       return Math.sqrt(dx * dx + dy * dy) <= km;
     }

  });
