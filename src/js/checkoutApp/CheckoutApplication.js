(function(angular){

  var module = angular.module('facepay-ceckout', [
    'ui.router',
    'LocalStorageModule'
  ]);

  module.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise("/myFacePay");

    $stateProvider
      .state('checkout', {
        url: "/",
        data: {
          title: 'Checkout'
        },
        controller: 'MyFacePayController',
        templateUrl: "partials/myFacePay.html"
      });

    localStorageServiceProvider
      .setPrefix('fp');

    localStorageServiceProvider
      .setStorageType('localStorage');

  });

})(window.angular);