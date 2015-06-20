var http = require('http');
var express = require('express');
var app = express();

// configure express
require('./config/express')(app);

// load routes
require('./config/routes')(app);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
