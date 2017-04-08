'use strict';

angular.module('daFansApp')
  .controller('TeamCtrl', function ($scope, $rootScope, $http, socket, $geolocation, $routeParams) {

    var check4Teams = function() {
      if ($rootScope.city != undefined) {
        $("#loading-screen").addClass('hide')
      }
    }

    $scope.allTeams = [
                {
                  "name":"Baltimore Ravens",
                  "teamId":"ravens",
                  "img": "ravens.svg"
                },
                {
                  "name":"Cincinatti Bengals",
                  "teamId":"bengals",
                  "img": "bengals.svg"
                },
                {
                  "name":"Cleveland Browns",
                  "teamId":"browns",
                  "img": "browns.svg"
                },
                {
                  "name":"Pittsburgh Steelers",
                  "teamId":"steelers",
                  "img": "steelers.svg"
                },
                {
                  "name":"Chicago Bears",
                  "teamId":"bears",
                  "img": "bears.svg"
                },
                {
                  "name":"Detroit Lions",
                  "teamId":"lions",
                  "img": "lions.svg"
                },
                {
                  "name":"Green Bay Packers",
                  "teamId":"packers",
                  "img": "packers.svg"
                },
                {
                  "name":"Minnesota Vikings",
                  "teamId":"vikings",
                  "img": "vikings.svg"
                },
                {
                  "name":"Houston Texans",
                  "teamId":"texans",
                  "img": "texans.svg"
                },
                {
                  "name":"Indianapolis Colts",
                  "teamId":"colts",
                  "img": "colts.svg"
                },
                {
                  "name":"Jacksonville Jaguars",
                  "teamId":"jaguars",
                  "img": "jaguars.svg"
                },
                {
                  "name":"Tennessee Titans",
                  "teamId":"titans",
                  "img": "titans.svg"
                },
                {
                  "name":"Atlanta Falcons",
                  "teamId":"falcons",
                  "img": "falcons.svg"
                },
                {
                  "name":"Carolina Panthers",
                  "teamId":"panthers",
                  "img": "panthers.svg"
                },
                {
                  "name":"New Orleans Saints",
                  "teamId":"saints",
                  "img": "saints.svg"
                },
                {
                  "name":"Tampa Bay Buccaneers",
                  "teamId":"bucs",
                  "img": "buccaneers.svg"
                },
                {
                  "name":"Buffalo Bills",
                  "teamId":"bills",
                  "img": "bills.svg"
                },
                {
                  "name":"Miami Dolphins",
                  "teamId":"dolphins",
                  "img": "dolphins.svg"
                },
                {
                  "name":"New England Patriots",
                  "teamId":"patriots",
                  "img": "patriots.svg"
                },
                {
                  "name":"New York Jets",
                  "teamId":"jets",
                  "img": "jets.svg"
                },
                {
                  "name":"Dallas Cowboys",
                  "teamId":"cowboys",
                  "img": "cowboys.svg"
                },
                {
                  "name":"New York Giants",
                  "teamId":"giants",
                  "img": "giants.svg"
                },
                {
                  "name":"Philadelphia Eagles",
                  "teamId":"eagles",
                  "img": "eagles.svg"
                },
                {
                  "name":"Washington Redskins",
                  "teamId":"redskins",
                  "img": "redskins.svg"
                },
                {
                  "name":"Denver Broncos",
                  "teamId":"broncos",
                  "img": "broncos.svg"
                },
                {
                  "name":"Kansas City Chiefs",
                  "teamId":"chiefs",
                  "img": "chiefs.svg"
                },
                {
                  "name":"Las Vegas Raiders",
                  "teamId":"raiders",
                  "img": "raiders.svg"
                },
                {
                  "name":"Los Angeles Chargers",
                  "teamId":"chargers",
                  "img": "chargers.svg"
                },
                {
                  "name":"Arizona Cardinals",
                  "teamId":"cardinals",
                  "img": "cardinals.svg"
                },
                {
                  "name":"San Francisco 49ers",
                  "teamId":"niners",
                  "img": "niners.svg"
                },
                {
                  "name":"Seattle Seahawks",
                  "teamId":"seahawks",
                  "img": "seahawks.svg"
                },
                {
                  "name":"Los Angeles Rams",
                  "teamId":"rams",
                  "img": "rams.svg"
                }]

                check4Teams()

  });
