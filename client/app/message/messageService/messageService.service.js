'use strict';

angular.module('daFansApp')
  .service('messageService', function ($rootScope, $http, $routeParams, socket) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var thisTeam = $routeParams.teamId

    var getOneMessage = function (id) {
      return $http.get('/api/' + thisTeam + '/' + id)
    }

    var updateMessage = function (replyNumber, currentResponse, newData) {
      var newRepl = currentResponse.replies.concat(newData);
      // currentResponse.replies = newRepl
      Object.defineProperty(currentResponse, 'replies', {
        value: newRepl
      })
      // var extendedReply = _.extend(currentResponse, newRepl);

      return $http.put('/api/' + thisTeam + '/' + replyNumber, currentResponse);
    }

    return {
      getReply: getOneMessage,
      updateReplies: updateMessage
    };
  });
