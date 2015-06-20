var BrainTreeConnection = require('./../helper/BraintreeConnection');

exports.getClientToken = function(req, res){
  BrainTreeConnection.clientToken.generate({
    customerId: req.params.customerId
  }, function (error, response) {
    if(error){
      res.status(500).json(error);
    } else {
      res.status(200).json(response);
    }
  });
};