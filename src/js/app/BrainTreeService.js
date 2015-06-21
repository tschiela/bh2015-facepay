(function(angular){

  var module = angular.module('facepay-braintree', []);

  module.factory('BrainTreeService', [
    '$http',
    function($http){

      return {
        createTransaction: function (customerId, amount, callback) {

          $http({
            url: '/createTransaction',
            method: 'GET',
            params: {
              customer: customerId,
              amount: amount.toFixed(2)
            }
          }).then(
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