var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var BraintreeController = require('../controller/BrainTreeController');
var CustomerController = require('../controller/CustomerController');

module.exports = function(app){
  app.get('/getClientToken/:customerId', BraintreeController.getClientToken);
  app.get('/createTransaction', BraintreeController.createTransaction);
  app.post('/createCustomer', CustomerController.create);
};

