(function(angular){

  var module = angular.module('facepay-main', []);

  module.controller('MainController', [
    '$rootScope',
    '$scope',
    function($rootScope, $scope){
      $scope.title = '';

      $rootScope.$on('$stateChangeSuccess', function(event, toState){
        if(toState.data.title){
          $scope.title = toState.data.title;
        }
      })
    }
  ]);



})(window.angular);