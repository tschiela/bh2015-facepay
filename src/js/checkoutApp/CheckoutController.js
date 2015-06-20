(function(angular){

  var module = angular.module('facepay-ceckout');

  module.controller('CheckoutController', [
    '$scope',
    '$http',
    'UserStorage',
    function($scope, $http, UserStorage){
      $scope.captured = false;
      $scope.customer = {
        photo: ''
      };
      $scope.storedUser = UserStorage.get();


      // Grab elements, create settings, etc.
      var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
          console.log("Video capture error: ", error.code);
        };

      // Put video listeners into place
      if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
          video.src = stream;
          video.play();
        }, errBack);
      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
      else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      }

      $scope.takeSnapshot = function(){
        context.drawImage(video, 0, 0, 480, 360);
        $scope.user.photo = canvas.toDataURL("image/jpeg");
        $scope.captured = true;
      };

      $scope.removeSnapshot = function(){
        $scope.user.photo = '';
        $scope.captured = false;
      };

      $scope.save = function(){



      };
    }
  ]);


})(window.angular);