(function(angular){

  var module = angular.module('facepay', [
    'ui.router',
    'LocalStorageModule'
  ]);

  module.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise("/myFacePay");

    $stateProvider
      .state('myFacePay', {
        url: "/myFacePay",
        data: {
          title: 'My FacePay'
        },
        controller: 'MyFacePayController',
        templateUrl: "partials/myFacePay.html"
      })
      .state('paymentAccounts', {
        url: "/paymentAccounts",
        data: {
          title: 'Payment Accounts'
        },
        controller: 'PaymentAccountsController',
        templateUrl: "partials/paymentAccounts.html"
      })
      .state('billingHistory', {
        url: "/billingHistory",
        data: {
          title: 'Billing History'
        },
        templateUrl: "partials/billingHistory.html"
      });

    localStorageServiceProvider
      .setPrefix('fp');

    localStorageServiceProvider
      .setStorageType('localStorage');

  });

})(window.angular);