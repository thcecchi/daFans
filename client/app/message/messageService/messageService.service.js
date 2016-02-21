'use strict';

angular.module('daFansApp')
  .service('messageService', function ($rootScope, $http, $routeParams, socket) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var thisTeam = $routeParams.teamId

    var getOneMessage = function (id) {
      return $http.get('/api/' + thisTeam + '/' + id)
    }

    var updateMessage = function (replyNumber, newData) {
      console.log(newData)
      return $http.put('/api/' + thisTeam + '/' + replyNumber, {replies: newData});
    }

    return {
      getReply: getOneMessage,
      updateReplies: updateMessage
    };
  });
