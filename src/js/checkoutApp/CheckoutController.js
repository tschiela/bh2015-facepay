(function(angular){

  var module = angular.module('facepay-checkout');

  var store = {
    product_4009900454087: {
      number: '4009900454087',
      price: 1.99,
      name: 'Extra Professional'
    },
    product_90162565: {
      number: '90162565',
      price: 2.50,
      name: 'RedBull Energy Drink'
    },
    product_76107214: {
      number: '76107214',
      price: 2.22,
      name: 'Ricolo Eucalyptus'
    },
    product_4260107220015: {
      number: '4260107220015',
      price: 1.60,
      name: 'fritz Cola'
    }
  };

  // drawing method
  var myDrawMethod = function (face, global_image_data) {
    console.log(face);

    var canvas = document.getElementById('overlay');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 360, 480);
    var imageObj = new Image();
    imageObj.onload = function()
    {
      context.drawImage(imageObj, 0, 0);
      // draw face box
      context.beginPath();
      context.rect(face.topLeftX, face.topLeftY, face.width, face.height);
      context.lineWidth = 4;
      context.strokeStyle = '#009CDE';
      context.stroke();
      // draw left eye
      context.beginPath();
      context.moveTo(face.leftEyeCornerLeftX, face.leftEyeCornerLeftY);
      context.lineTo(face.leftEyeCornerRightX, face.leftEyeCornerRightY);
      context.stroke();
      context.beginPath();
      context.moveTo(face.leftEyeCenterX, (face.leftEyeCenterY + (face.height / 25)));
      context.lineTo(face.leftEyeCenterX, (face.leftEyeCenterY - (face.height / 25)));
      context.stroke();
      // draw right eye
      context.beginPath();
      context.moveTo(face.rightEyeCornerLeftX, face.rightEyeCornerLeftY);
      context.lineTo(face.rightEyeCornerRightX, face.rightEyeCornerRightY);
      context.stroke();
      context.beginPath();
      context.moveTo(face.rightEyeCenterX, (face.rightEyeCenterY + (face.height / 25)));
      context.lineTo(face.rightEyeCenterX, (face.rightEyeCenterY - (face.height / 25)));
      context.stroke();
      // left eyebrow
      context.beginPath();
      context.moveTo(face.leftEyeBrowLeftX, face.leftEyeBrowLeftY);
      context.lineTo(face.leftEyeBrowMiddleX, face.leftEyeBrowMiddleY);
      context.stroke();
      context.beginPath();
      context.moveTo(face.leftEyeBrowMiddleX, face.leftEyeBrowMiddleY);
      context.lineTo(face.leftEyeBrowRightX, face.leftEyeBrowRightY);
      context.stroke();
      // right eyebrow
      context.beginPath();
      context.moveTo(face.rightEyeBrowLeftX, face.rightEyeBrowLeftY);
      context.lineTo(face.rightEyeBrowMiddleX, face.rightEyeBrowMiddleY);
      context.stroke();
      context.beginPath();
      context.moveTo(face.rightEyeBrowMiddleX, face.rightEyeBrowMiddleY);
      context.lineTo(face.rightEyeBrowRightX, face.rightEyeBrowRightY);
      context.stroke();
      // draw mouth
      context.beginPath();
      context.moveTo(face.lipCornerLeftX, face.lipCornerLeftY);
      context.lineTo(face.lipLineMiddleX, face.lipLineMiddleY);
      context.stroke();
      context.beginPath();
      context.moveTo(face.lipLineMiddleX, face.lipLineMiddleY);
      context.lineTo(face.lipCornerRightX, face.lipCornerRightY);
      context.stroke();
      // draw nose
      context.beginPath();
      context.moveTo(face.nostrilLeftSideX, face.nostrilLeftSideY);
      context.lineTo(face.nostrilLeftHoleBottomX, face.nostrilLeftHoleBottomY);
      context.stroke();
      context.beginPath();
      context.moveTo(face.nostrilRightSideX, face.nostrilRightSideY);
      context.lineTo(face.nostrilRightHoleBottomX, face.nostrilRightHoleBottomY);
      context.stroke();
    };
    imageObj.src = 'data:image/jpeg;base64,' + global_image_data;
  };

  module.controller('CheckoutController', [
    '$scope',
    '$http',
    '$timeout',
    'UserStorage',
    'KairosService',
    'BrainTreeService',
    function($scope, $http, $timeout, UserStorage, KairosService, BrainTreeService){
      $scope.captured = false;
      $scope.customer = {
        photo: ''
      };
      $scope.products = [];
      $scope.total = 0;
      $scope.vat = 0;
      $scope.subtotal = 0;
      $scope.showLoading = false;
      $scope.accuracy = 0;
      var _timeout;

      var calcTotal = function(){
        $scope.products.forEach(function(product){
          $scope.total += product.price;
        });

        $scope.vat = $scope.total*0.19;
        $scope.subtotal = $scope.total + $scope.vat;
      };

      $scope.scanProduct = function(event){
        if(_timeout){ //if there is already a timeout in process cancel it
          $timeout.cancel(_timeout);
        }
        _timeout = $timeout(function(){
          $scope.addProduct($scope.productScan);
          _timeout = null;
        },100);
      };

      $scope.addProduct = function(number){
        var product = store['product_'+number];

        if(product){
          var alreadyInList = false;
          for(var i = 0, productLen = $scope.products.length; i < productLen; i++){
            if($scope.products[i].number === number){
              $scope.products[i].pieces++;
              alreadyInList = true;
              break;
            }
          }

          if(!alreadyInList){
            product.pieces = 1;
            $scope.products.push(product);
          }

          $scope.productScan = '';
        }

        calcTotal();
      };




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
        $scope.customer.photo = canvas.toDataURL("image/jpeg");
        $scope.captured = true;
      };

      $scope.removeSnapshot = function(){
        $scope.customer.photo = '';
        $scope.captured = false;
      };

      $scope.save = function(){
        var photoData = $scope.customer.photo.replace("data:image/jpeg;base64,", "").replace("data:image/jpg;base64,", "");
        $scope.showLoading = true;

        // get face geometry
        KairosService.detect(photoData, function(response){
          var success = JSON.parse(response.responseText);

          if(success && success.images && success.images[0] && success.images[0].faces && success.images[0].faces[0]){
            myDrawMethod(success.images[0].faces[0], photoData);
          }
        });

        KairosService.recognize(photoData, function(kResponse){
          //console.log('recognize user with id  ' + kResponse.data.id + ' to database');
          var success = JSON.parse(kResponse.responseText);

          if(success && success.images && success.images[0] && success.images[0].candidates && success.images[0].candidates[0]){
            var keys = Object.keys(success.images[0].candidates[0]);
            var id;

            keys.forEach(function(key){
              if(key != 'enrollment_timestamp'){
                id = key;
                $scope.accuracy = parseFloat(success.images[0].candidates[0][id])*100;
                $scope.accuracy = $scope.accuracy.toFixed(2);
                console.log(success);
              }
            });

            $scope.storedCustomer = UserStorage.getCustomer(id).input;

            BrainTreeService.createTransaction(id, $scope.subtotal, function(error, response){
              if(error){
                // show error
              } else {
                //console.log(response);
              }
            });
          } else {
            // show error
          }

          $scope.showLoading = false;
          $scope.$apply();
        });
      };
    }
  ]);


  module.directive('barcodeInput', [
    function(){
      return {
        restrict: 'A',
        link: function($scope, $element){
          $element.bind('keydown', function(event){
            if(event.which==17 || event.which==74){
              event.preventDefault();
            }
          });
        }
      }
    }
  ]);


  /**
   * Author: Thomas Schiela
   * Date: 24.09.13
   * Time: 15:33
   */
  angular.module('common.autoFillFixDirective', [])
    .directive('autoFillFix', function() {
      return {
        restrict: 'A',
        priority: 10,
        link: function ($scope, element, attrs) {
          element.on('submit', function (ev) {
            $('input[ng-model]', element).each(function (index, item) {
              if(angular.element(this).attr('type') !== 'checkbox' && angular.element(this).attr('type') !== 'radio') {
                angular.element(this).controller('ngModel').$setViewValue($(this).val());
              }
            });
          });
        }
      }
    });


})(window.angular);
