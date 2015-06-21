(function(angular){

  var module = angular.module('facepay');

  module.controller('MyFacePayController', [
    '$scope',
    '$http',
    'UserStorage',
    'KairosService',
    function($scope, $http, UserStorage, KairosService){
      $scope.captured = false;
      $scope.user = {
        photo: ''
      };
      $scope.showLoading = false;

      //$scope.storedUser = UserStorage.get();
      //if($scope.storedUser && $scope.storedUser.input){
      //  $scope.user = $scope.storedUser.input;
      //
      //  if($scope.user.photo){
      //    $scope.captured = true;
      //  }
      //}

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
        var photoData = $scope.user.photo.replace("data:image/jpeg;base64,", "").replace("data:image/jpg;base64,", "");
        $scope.showLoading = true;

        $http.post('/createCustomer', $scope.user).then(
          function(btResponse){
            UserStorage.addCustomer({
              input: $scope.user,
              customer: btResponse.data
            });

            KairosService.enroll(photoData, btResponse.data.id, function(kResponse){
              console.log('saved id and image data ' + btResponse.data.id + ' to database');
              $scope.showLoading = false;
              $scope.$apply();
            });
          },
          function(error){
            console.error(error);
            $scope.showLoading = false;
          }
        );
      };
    }
  ]);


})(window.angular);