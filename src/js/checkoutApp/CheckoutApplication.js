(function(angular){

  var module = angular.module('facepay-checkout', [
    'ui.router',
    'LocalStorageModule',
    'facepay-main',
    'facepay-storage',
    'facepay-kairos'
  ]);

  module.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise("/myFacePay");

    $stateProvider
      .state('checkout', {
        url: "/",
        data: {
          title: 'Checkout'
        },
        controller: 'CheckoutController',
        templateUrl: "partials/checkout.html"
      });

    localStorageServiceProvider
      .setPrefix('fp');

    localStorageServiceProvider
      .setStorageType('localStorage');

  });

})(window.angular);