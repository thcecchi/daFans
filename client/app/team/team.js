'use strict';

angular.module('daFansApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/team/team.html',
        controller: 'GeolocationCtrl'
      });
  });
