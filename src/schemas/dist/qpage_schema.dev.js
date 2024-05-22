"use strict";

var mongoose = require('mongoose');

var quotation_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobno: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  qno: {
    type: Number,
    required: true
  },
  exp: {
    type: Date,
    required: true
  }
});
var qpage_schema = new mongoose.model('quotation_details', quotation_schema);
module.exports = qpage_schema;