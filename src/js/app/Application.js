(function(angular){

  var module = angular.module('facepay', [
    'ui.router',
    'omr.directives'
  ]);

  module.config(function($stateProvider, $urlRouterProvider) {
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
        templateUrl: "partials/paymentAccounts.html"
      })
      .state('billingHistory', {
        url: "/billingHistory",
        data: {
          title: 'Billing History'
        },
        templateUrl: "partials/billingHistory.html"
      })
  });

})(window.angular);