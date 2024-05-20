"use strict";

var mongoose = require('mongoose');

var connect = mongoose.connect('mongodb://localhost:27017/Auth_Login');
connect.then(function () {
  console.log('Connected to database');
})["catch"](function () {
  console.log('Error connecting to database');
});