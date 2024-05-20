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
var company_reg_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  paidCapital: {
    type: Number,
    required: true
  },
  authorizedCapital: {
    type: Number,
    required: true
  },
  reservation: {
    type: Boolean,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  addressProof: {
    type: String,
    required: true
  }
});
var company_reg = new mongoose.model('company_reg', company_reg_schema);
module.exports = company_reg;
var director_reg_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  MOBno: {
    type: Number,
    required: true
  },
  sharePattern: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  DINno: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  PANno: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  }
});
var director_reg = new mongoose.model('director_reg', director_reg_schema);
module.exports = director_reg;
var dfload_schema = new mongoose.Schema({
  PAN: {
    type: String,
    required: true
  },
  Passport: {
    type: String,
    required: true
  },
  DrLic: {
    type: String,
    required: true
  },
  VotingCard: {
    type: String,
    required: true
  },
  bankHistory: {
    type: String,
    required: true
  },
  LightBill: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  sign: {
    type: String,
    required: true
  }
});
var dfload = new mongoose.model('director_file_upload', dfload_schema);
module.exports = dfload;
var ofload_schema = new mongoose.Schema({
  other: {
    type: String,
    required: true
  },
  DLNOC: {
    type: String,
    required: true
  },
  ULNOC: {
    type: String,
    required: true
  }
});
var ofload = new mongoose.model('other_file_upload', ofload_schema);
module.exports = ofload;
var company_detail_reg_schema = new mongoose.Schema({
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
  objectives: {
    type: String,
    required: true
  }
});
var company_detail_reg = new mongoose.model('company_detail_reg', company_detail_reg_schema);
module.exports = company_detail_reg;
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