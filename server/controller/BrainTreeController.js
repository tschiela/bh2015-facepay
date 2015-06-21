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

exports.createTransaction = function(req, res){
  //BrainTreeConnection.paymentMethod.create({
  //  customerId: req.params.customerId,
  //  paymentMethodNonce: req.params.nonce
  //}, function (error, response) {
  //  if(error){
  //    res.status(500).json(error);
  //  } else {
  //    console.log(response);
  //    res.status(200).json(response);
  //  }
  //});

  BrainTreeConnection.transaction.sale({
    customerId: req.query.customer,
    amount: req.query.amount
  }, function (error, result) {
      if(error){
        res.status(500).json(error);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
  });
};

