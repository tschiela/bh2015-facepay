(function(angular){

  var module = angular.module('facepay');
  var key = 'customer';

  module.controller('PaymentAccountsController', [
    '$scope',
    'CustomerApi',
    function($scope, CustomerApi){

      CustomerApi.getCustomerId(function(error, response){
        if(response && response.data && response.data.clientToken){
          braintree.setup(response.data.clientToken, "paypal", {
            container: "paypal-container",
            singleUse: false,
            onPaymentMethodReceived: function (obj) {
              var storedUser = UserStorage.get(key);
              storedUser.nonce = obj.nonce;
              UserStorage.set(key, storedUser);
            }
          });
        }
      });
    }
  ]);

  module.factory('CustomerApi', [
    '$http',
    'UserStorage',
    function($http, UserStorage){
      var storedUser = UserStorage.get();

      return {
        getCustomerId: function(callback){
          $http.get('/getClientToken/' + storedUser.customer.id).then(
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