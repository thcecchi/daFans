'use strict';

angular.module('daFansApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ngGeolocation',
  'angularMoment'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/team/:teamId', {
          templateUrl: 'app/message/message.html',
          controller: 'MessageCtrl as message'
        })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $geolocation, geoService) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });

// Get user's location
    $geolocation.getCurrentPosition({
      timeout: 60000
    }).then(function(position) {
          var lat = position.coords.latitude
          var lng = position.coords.longitude

          geoService.getLocationStats(lat, lng).success(function(data) {
            $("#loading-screen").addClass('hide')
            $rootScope.city = data.results[0].address_components[3].short_name
            console.log($rootScope.city)
          })
        })

  });
