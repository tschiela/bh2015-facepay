(function(angular){

  var module = angular.module('facepay');
  var key = 'customer';

  module.controller('PaymentAccountsController', [
    '$scope',
    'UserStorage',
    'CustomerApi',
    function($scope, UserStorage, CustomerApi){
      var customer = UserStorage.getCurrentCustomer();

      if(customer && customer.customer && customer.customer.id){
        CustomerApi.getCustomerId(customer.customer.id, function(error, response){
          if(response && response.data && response.data.clientToken){
            braintree.setup(response.data.clientToken, "paypal", {
              container: "paypal-container",
              singleUse: false,
              onPaymentMethodReceived: function (obj) {
                customer.nonce = obj.nonce;
                UserStorage.addCustomer(customer);
              }
            });
          }
        });
      }
    }
  ]);

})(window.angular);