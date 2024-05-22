"use strict";

var mongoose = require('mongoose');

var connect = mongoose.connect('mongodb://localhost:27017/Auth_Login');
connect.then(function () {
  console.log('Connected to database');
})["catch"](function () {
  console.log('Error connecting to database');
});
var LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var collection = new mongoose.model('users', LoginSchema);
module.exports = collection;