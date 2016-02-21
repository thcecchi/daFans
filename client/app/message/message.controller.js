'use strict';

angular.module('daFansApp')
  .controller('MessageCtrl', function (geoService, $scope, $http, socket, $geolocation, $routeParams, $rootScope, moment) {
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
        console.log($scope.localMessages)
      })
    }

    $rootScope.startAtBottom = function () {
      var element = document.getElementById("message-box");
      element.scrollTop = element.scrollHeight;
      console.log('bottom of message-box!')
    }

    $rootScope.arrangeComments = function (comments) {
      for (var i = 0; i < comments.length; i++){
        console.log(comments[i].loc)
        if (comments[i].loc == $rootScope.city && comments[i].time > lastWeek) {
          $scope.localMessages.push(comments[i])
        }
      }
    }

    $scope.addMessage = function () {
      if($scope.newMessage === '') {
        return;
      }
      console.log($rootScope.city)
      $http.post('/api/' + thisTeam, { message: $scope.newMessage,
                                       loc: $rootScope.city,
                                       time: new Date()
                                     }).then(function () {
                                       $rootScope.startAtBottom()
                                     });
      $scope.newMessage = '';
      $scope.revealForm();
    };


    $scope.replyMessage = function () {
      $http.get('/api/' + thisTeam + '/' + $scope.replyId).success(function(thisMessage) {
        $scope.currentMessage = thisMessage
      })
      console.log($scope.currentMessage)

      if($scope.newReply === '') {
        return;
      }
      $http.put('/api/' + thisTeam + '/' + $scope.replyId, { replies:
        {
          reply: $scope.newReply,
          replyTime: new Date()
        }


                                     }).then(function () {
                                       $rootScope.startAtBottom()
                                     });
      $scope.newReply = '';
      $scope.revealReplyForm();
    };

    $scope.revealForm = function () {
      $rootScope.startAtBottom()
      $('.form-container').toggleClass('active');
      $('.plus-icon').toggleClass('active');
      $('#message-box').toggleClass('faded');
    }

    $scope.revealReplyForm = function (commentId) {
      $scope.replyId = commentId
      $rootScope.startAtBottom()
      $('.reply-container').toggleClass('active');
      $('.plus-icon').toggleClass('active');
      $('#message-box').toggleClass('faded');
    }

    $scope.deleteMessage = function (message) {
      if (message.time > moment().diff('days'))
      console.log()
      $http.delete('/api/messages/' + message._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });

  });
