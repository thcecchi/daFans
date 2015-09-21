'use strict';

angular.module('daFansApp')
  .controller('TeamCtrl', function ($scope, $http, socket, $geolocation, $routeParams) {
    $scope.message = 'Hello';

    $scope.allTeams = [
                {
                  "name":"Baltimore Ravens",
                  "teamId":"ravens"
                },
                {
                  "name":"Cincincatti Bengals",
                  "teamId":"bengals"
                },
                {
                  "name":"Cleveland Browns",
                  "teamId":"browns"
                },
                {
                  "name":"Pittsburgh Steelers",
                  "teamId":"steelers"
                },
                {
                  "name":"Chicago Bears",
                  "teamId":"bears"
                },
                {
                  "name":"Detroit Lions",
                  "teamId":"lions"
                },
                {
                  "name":"Green Bay Packers",
                  "teamId":"pakers"
                },
                {
                  "name":"Minnesota Vikings",
                  "teamId":"vikings"
                },
                {
                  "name":"Houston Texans",
                  "teamId":"texans"
                },
                {
                  "name":"Indianapolis Colts",
                  "teamId":"colts"
                },
                {
                  "name":"Jacksonville Jaguars",
                  "teamId":"jaguars"
                },
                {
                  "name":"Tennessee Titans",
                  "teamId":"titans"
                },
                {
                  "name":"Atlanta Falcons",
                  "teamId":"falcons"
                },
                {
                  "name":"Carolina Panthers",
                  "teamId":"panthers"
                },
                {
                  "name":"New Orleans Saints",
                  "teamId":"saints"
                },
                {
                  "name":"Tampa Bay Buccaneers",
                  "teamId":"bucs"
                },
                {
                  "name":"Buffalo Bills",
                  "teamId":"bills"
                },
                {
                  "name":"Miami Dolphins",
                  "teamId":"dolphins"
                },
                {
                  "name":"New England Patriots",
                  "teamId":"patriots"
                },
                {
                  "name":"New York Jets",
                  "teamId":"jets"
                },
                {
                  "name":"Dallas Cowboys",
                  "teamId":"cowboys"
                },
                {
                  "name":"New York Giants",
                  "teamId":"nyfbgiants"
                },
                {
                  "name":"Philadelphia Eagles",
                  "teamId":"eaglers"
                },
                {
                  "name":"Washington Redskins",
                  "teamId":"redkins"
                },
                {
                  "name":"Denver Broncos",
                  "teamId":"broncos"
                },
                {
                  "name":"Kansas City Chiefs",
                  "teamId":"chiefs"
                },
                {
                  "name":"Oakland Raiders",
                  "teamId":"ravens"
                },
                {
                  "name":"San Diego Chargers",
                  "teamId":"chargers"
                },
                {
                  "name":"Arizona Cardinals",
                  "teamId":"cardinals"
                },
                {
                  "name":"San Francisco 49ers",
                  "teamId":"niners"
                },
                {
                  "name":"Seattle Seahawks",
                  "teamId":"seahawks"
                },
                {
                  "name":"St. Louis Rams",
                  "teamId":"rams"
                }]



  });
