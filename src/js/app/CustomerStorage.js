(function(angular){

  var module = angular.module('facepay-storage', []);

  module.factory('UserStorage', [
    'localStorageService',
    function(localStorageService){
      return {
        addCustomer: function(customer){
          localStorageService.set('customer_' + customer.customer.id, customer);
          localStorageService.set('current', customer.customer.id);
        },
        getCustomer: function(id){
          return localStorageService.get('customer_' + id);
        },
        getCurrentCustomer: function(){
          var currentId = localStorageService.get('current');
          return localStorageService.get('customer_' + currentId);
        }
      }
    }
  ]);

  module.factory('CustomerApi', [
    '$http',
    'UserStorage',
    function($http, UserStorage){

      return {
        getCustomerId: function(customerId, callback){
          var storedUser = UserStorage.getCustomer(customerId);

          $http.get('/getClientToken/' + storedUser.customer.id).then(
            function(response){
              callback(null, response);
            },
            function(error){
              callback(error);
            }
          );
        },
        createPayment: function(nonce, customerId, callback){
          $http.get('/createPayment/' + customerId + '/' + nonce).then(
            function(response){
              callback(null, response);
            },
            function(error){
              callback(error);
            }
          );
        }
      }
    }
  ]);

})(window.angular);