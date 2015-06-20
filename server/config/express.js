var bodyParser = require('body-parser');
var logger = require('morgan');
var express = require('express');

module.exports = function(app){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('public'));
  app.use(logger('combined'));
};
