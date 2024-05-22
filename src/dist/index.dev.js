"use strict";

var express = require('express');

var path = require('path');

var bcrypt = require('bcrypt');

var collection = require('./config');

var company_reg = require('./schemas/company_reg');

var director_reg = require('./schemas/director_reg');

var dfload = require('./schemas/dfload');

var ofload = require('./schemas/ofload');

var company_detail_reg = require('./schemas/company_detail_reg');

var qpage_schema = require('./schemas/qpage_schema');

var multer = require('multer');

var app = express();
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
var storage1 = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'director_files/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload1 = multer({
  storage: storage1
});
var storage2 = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'other_files/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload2 = multer({
  storage: storage2
});
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.set('view engine', 'ejs');
app.use(express["static"]('public'));
app.get('/', function (req, res) {
  res.render('home');
  /*    company_reg.find()
      .then(company => res.json(company))
      .catch(err => res.json(err))*/
});
app.get('/api/companies', function _callee(req, res) {
  var companies;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(company_reg.find());

        case 3:
          companies = _context.sent;
          res.json(companies);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get('/api/directors', function _callee2(req, res) {
  var directors;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(director_reg.find());

        case 3:
          directors = _context2.sent;
          res.json(directors);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/signup', function (req, res) {
  res.render('signup');
});
app.get('/fgpass', function (req, res) {
  res.render('fgpass');
});
app.get('/creg', function (req, res) {
  res.render('creg');
});
app.get('/dreg', function (req, res) {
  res.render('dreg');
});
app.get('/dfload', function (req, res) {
  res.render('dfload');
});
app.get('/ofload', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('ofload');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/cdreg', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render('cdreg');

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get('/qpage', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render('qpage');

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.post('/signup', function _callee6(req, res) {
  var data, existingUser, saltRounds, hashedPassword, userdata;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          data = {
            email: req.body.email,
            password: req.body.password
          };
          _context6.next = 3;
          return regeneratorRuntime.awrap(collection.findOne({
            email: data.email
          }));

        case 3:
          existingUser = _context6.sent;

          if (!existingUser) {
            _context6.next = 8;
            break;
          }

          res.send('User already exists');
          _context6.next = 13;
          break;

        case 8:
          saltRounds = 10;
          _context6.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(data.password, saltRounds));

        case 11:
          hashedPassword = _context6.sent;
          data.password = hashedPassword;

        case 13:
          _context6.next = 15;
          return regeneratorRuntime.awrap(collection.insertMany(data));

        case 15:
          userdata = _context6.sent;
          res.render('login');
          console.log(userdata);

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.post('/login', function _callee7(req, res) {
  var check, match;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(collection.findOne({
            email: req.body.email
          }));

        case 3:
          check = _context7.sent;

          if (!check) {
            res.send('User does not exist');
          }

          _context7.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, check.password));

        case 7:
          match = _context7.sent;

          if (match) {
            res.render('home');
          } else {
            res.send('Incorrect Password');
          }

          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          res.send('Incorrect Details');

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
app.post('/fgpass', function _callee8(req, res) {
  var _req$body, email, password, user, hashedPassword;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(collection.findOne({
            email: email
          }));

        case 4:
          user = _context8.sent;

          if (user) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", res.status(400).send('User not found'));

        case 7:
          _context8.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashedPassword = _context8.sent;
          user.password = hashedPassword;
          _context8.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.render('login');
          _context8.next = 19;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](1);
          res.status(500).send('Error resetting password');

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
app.post('/creg', upload.single('addressProof'), function _callee9(req, res) {
  var data, userdata;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          data = {
            name: req.body.name,
            type: req.body.type,
            purpose: req.body.purpose,
            paidCapital: req.body.paidCapital,
            authorizedCapital: req.body.authorizedCapital,
            reservation: req.body.reservation === 'Reserved',
            address: req.body.address,
            addressProof: req.file.path
          };
          _context9.next = 3;
          return regeneratorRuntime.awrap(company_reg.insertMany(data));

        case 3:
          userdata = _context9.sent;
          res.render('home');
          console.log(userdata);

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.post('/dreg', function _callee10(req, res) {
  var data, userdata;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          data = {
            name: req.body.name,
            DOB: req.body.DOB,
            MOBno: req.body.MOBno,
            sharePattern: req.body.sharePattern,
            education: req.body.education,
            DINno: req.body.DINno,
            PANno: req.body.PANno,
            email: req.body.email,
            Gender: req.body.Gender,
            occupation: req.body.occupation
          };
          _context10.next = 3;
          return regeneratorRuntime.awrap(director_reg.insertMany(data));

        case 3:
          userdata = _context10.sent;
          res.render('home');
          console.log(userdata);

        case 6:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.post('/dfload', upload1.fields([{
  name: 'PAN'
}, {
  name: 'Passport'
}, {
  name: 'DrLic'
}, {
  name: 'VotingCard'
}, {
  name: 'bankHistory'
}, {
  name: 'LightBill'
}, {
  name: 'photo'
}, {
  name: 'sign'
}]), function _callee11(req, res) {
  var data, userdata;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          data = {
            PAN: req.files['PAN'][0].path,
            Passport: req.files['Passport'][0].path,
            DrLic: req.files['DrLic'][0].path,
            VotingCard: req.files['VotingCard'][0].path,
            bankHistory: req.files['bankHistory'][0].path,
            LightBill: req.files['LightBill'][0].path,
            photo: req.files['photo'][0].path,
            sign: req.files['sign'][0].path
          };
          _context11.next = 3;
          return regeneratorRuntime.awrap(dfload.insertMany(data));

        case 3:
          userdata = _context11.sent;
          res.render('home');
          console.log(userdata);

        case 6:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.post('/ofload', upload2.fields([{
  name: 'other'
}, {
  name: 'DLNOC'
}, {
  name: 'ULNOC'
}]), function _callee12(req, res) {
  var data, userdata;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          data = {
            other: req.files['other'][0].path,
            DLNOC: req.files['DLNOC'][0].path,
            ULNOC: req.files['ULNOC'][0].path
          };
          _context12.next = 3;
          return regeneratorRuntime.awrap(ofload.insertMany(data));

        case 3:
          userdata = _context12.sent;
          res.render('home');
          console.log(userdata);

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.post('/cdreg', function _callee13(req, res) {
  var data, userdata;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          data = {
            name: req.body.name,
            email: req.body.email,
            mobno: req.body.mobno,
            address: req.body.address,
            purpose: req.body.purpose,
            objectives: req.body.objectives
          };
          _context13.next = 3;
          return regeneratorRuntime.awrap(company_detail_reg.insertMany(data));

        case 3:
          userdata = _context13.sent;
          res.render('home');
          console.log(userdata);

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app.post('/qpage', function _callee14(req, res) {
  var data, userdata;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          data = {
            name: req.body.name,
            email: req.body.email,
            mobno: req.body.mobno,
            address: req.body.address,
            purpose: req.body.purpose,
            qno: req.body.qno,
            exp: req.body.exp
          };
          _context14.next = 3;
          return regeneratorRuntime.awrap(qpage_schema.insertMany(data));

        case 3:
          userdata = _context14.sent;
          res.render('home');
          console.log(userdata);

        case 6:
        case "end":
          return _context14.stop();
      }
    }
  });
});
var port = 5000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});