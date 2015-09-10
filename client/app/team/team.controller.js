'use strict';

angular.module('daFansApp')
  .controller('TeamCtrl', function ($scope, $http, socket, $geolocation) {
    $scope.message = 'Hello';

    $scope.allTeams = [
                {"name":"Baltimore Ravens"},
                {"name":"Cincincatti Bengals"},
                {"name":"Cleveland Browns"},
                {"name":"Pittsburgh Steelers"},
                {"name":"Chicago Bears"},
                {"name":"Detroit Lions"},
                {"name":"Green Bay Packers"},
                {"name":"Minnesota Vikings"},
                {"name":"Houston Texans"},
                {"name":"Indianapolis Colts"},
                {"name":"Jacksonville Jaguars"},
                {"name":"Tennessee Titans"},
                {"name":"Atlanta Falcons"},
                {"name":"Carolina Panthers"},
                {"name":"New Orleans Saints"},
                {"name":"Tampa Bay Buccaneers"},
                {"name":"Buffalo Bills"},
                {"name":"Miami Dolphins"},
                {"name":"New England Patriots"},
                {"name":"New York Jets"},
                {"name":"Dallas Cowboys"},
                {"name":"New York Giants"},
                {"name":"Philadelphia Eagles"},
                {"name":"Washington Redskins"},
                {"name":"Denver Broncos"},
                {"name":"Kansas City Chiefs"},
                {"name":"Oakland Raiders"},
                {"name":"San Diego Chargers"},
                {"name":"Arizona Cardinals"},
                {"name":"San Francisco 49ers"},
                {"name":"Seattle Seahawks"},
                {"name":"St. Louis Rams"}]
  });
