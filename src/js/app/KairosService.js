(function(angular){

  var module = angular.module('facepay-kairos', []);

  module.factory('KairosService', [
    function(){
      var kairos = new Kairos("43bc36db", "e92cf185c4df241137e8d0369cdbc917");
      var namespace = 'customer2';

      return {
        enroll: function (base64_data, customerId, callback) {
          kairos.enroll(base64_data, namespace, customerId, function (response) {
            callback(response);
          }, {selector: 'FULL'});
        },
        detect: function (base64_data, callback) {
          kairos.detect(base64_data, function (response) {
            callback(response);
          }, {selector: 'FULL'});
        },
        recognize: function (base64_data, callback) {
          kairos.recognize(base64_data, namespace, function (response) {
            callback(response);
          }, {threshold: 0.50, selector: 'FULL'});
        }
      }
    }
  ]);

})(window.angular);