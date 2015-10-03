'use strict';

angular.module('daFansApp')
  .controller('GeolocationCtrl', function (geoService, $scope, $http, socket, $geolocation) {
    var geo = this

     var arePointsNear = function(checkPoint, centerPoint, km) {
       var ky = 40000 / 360;
       var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
       var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
       var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
       return Math.sqrt(dx * dx + dy * dy) <= km;
     }

  });
