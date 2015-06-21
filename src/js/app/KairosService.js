(function(angular){

  var module = angular.module('facepay-kairos', []);

  module.factory('KairosService', [
    function(){
      var kairos = new Kairos("43bc36db", "e92cf185c4df241137e8d0369cdbc917");

      return {
        enroll: function (base64_data, customerId, callback) {
          kairos.enroll(base64_data, 'customers1', customerId, function (response) {
            callback(response);
          });
        },
        recognize: function (base64_data, callback) {
          kairos.recognize(base64_data, 'customers1', function (response) {
            callback(response);
          }, {threshold: 0.75});
        }
      }
    }
  ]);

})(window.angular);