'use strict';

angular.module('daFansApp')
  .controller('MessageCtrl', function (messageService, geoService, $scope, $http, socket, $geolocation, $routeParams, $rootScope, moment) {
    var thisTeam = $routeParams.teamId
    var thisTeamSing = thisTeam.substring(0, thisTeam.length - 1);
    var thisTeamPlur = thisTeam.substr(0, 1).toUpperCase() + thisTeam.substr(1);
    var lastWeek = moment().subtract(7, 'days').startOf('day').format();
    $rootScope.localMessages = [];
    $scope.team = thisTeamPlur

    if(!$rootScope.city) {
      geoService.runLocationCheck(thisTeam)
    }

    else {
      $http.get('/api/' + thisTeam).success(function(allMessages) {
        $scope.arrangeComments(allMessages)
        socket.syncUpdates(thisTeamSing, $scope.localMessages)
      })
    }

    $rootScope.startAtBottom = function () {
      var element = document.getElementById("message-box");
      element.scrollTop = element.scrollHeight;
    }

    $scope.hideNav = function () {
      $('#subnav').offcanvas('toggle');
    }

    $rootScope.arrangeComments = function (comments) {
      for (var i = 0; i < comments.length; i++){
        if (comments[i].loc == $rootScope.city && comments[i].time > lastWeek) {
          $scope.localMessages.push(comments[i])
        }
      }
        $scope.localMessages.reverse();
    }

    $scope.addMessage = function () {
      if($scope.newMessage === '') {
        return;
      }
      $http.post('/api/' + thisTeam, { message: $scope.newMessage,
                                       loc: $rootScope.city,
                                       time: new Date(),
                                       replies: []
                                     })
      $scope.newMessage = '';
      $scope.revealForm();
    };

    var existingReplies
    var newData
    $scope.replyMessage = function () {
      var messageId = $rootScope.replyId
      if($scope.newReply === '') {
        return;
      }

      var newReplyData = {
        reply: $scope.newReply,
        replyTime: new Date()
      }

      messageService.getReply(messageId).then(function(response) {
        var replyResponse = response.data
        messageService.updateReplies(messageId, replyResponse, newReplyData);
      }).then(function () {
           socket.syncUpdates(thisTeamSing, $scope.localMessages)
         });
      $scope.newReply = '';
      $scope.revealReplyForm();
    };

    $scope.getReplies = function (messageId) {
      messageService.getReply(messageId)
    };

    $scope.updateReply = function (id, data) {
      messageService.updateReplies(id, data);
    };

    $scope.revealForm = function () {
      if($('.reply-container').hasClass('active')) {
        $scope.revealReplyForm()
      }

      else {
        $('.form-container').toggleClass('active');
        $('.plus-icon').toggleClass('active');
        $('#message-box').toggleClass('faded');
      }
    }

    $scope.revealReplyForm = function (commentId) {
      $rootScope.replyId = commentId
      $('.reply-container').toggleClass('active');
      $('.plus-icon').toggleClass('active');
      $('#message-box').toggleClass('faded');
    }

    $scope.deleteMessage = function (message) {
      if (message.time > moment().diff('days'))
      $http.delete('/api/messages/' + message._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });

  });
