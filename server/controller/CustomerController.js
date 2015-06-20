var BrainTreeConnection = require('./../helper/BraintreeConnection');

exports.create = function(req, res){
  BrainTreeConnection.customer.create({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone
  }, function (error, result) {
    if(error){
      res.status(500).json(error);
    } else {
      res.status(200).json(result.customer);
    }
  });
};