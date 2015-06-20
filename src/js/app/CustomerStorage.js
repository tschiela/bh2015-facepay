(function(angular){

  var module = angular.module('facepay');
  var key = 'customer';

  module.factory('UserStorage', [
    'localStorageService',
    function(localStorageService){
      return {
        save: function(customer){
          localStorageService.set(key, customer);
        },
        get: function(){
          return localStorageService.get(key);
        }
      }
    }
  ]);



})(window.angular);