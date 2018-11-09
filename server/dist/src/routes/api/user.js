'use strict';

var cov_kgoph4xyd = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/routes/api/user.js',
      hash = 'f89018a24fbe34de6a5a206ff3769bce1ad751fd',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/routes/api/user.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 15
        },
        end: {
          line: 6,
          column: 31
        }
      },
      '1': {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 85
        }
      },
      '2': {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 79
        }
      },
      '3': {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 74
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    f: {},
    b: {},
    _coverageSchema: '43e27e138ebf9cfc5966b082cf9a028302ed4184'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('../../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _validation = require('../../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _token = require('../../middlewares/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_kgoph4xyd.s[0]++, _express2.default.Router());

cov_kgoph4xyd.s[1]++;
router.post('/users/register', _validation2.default.signupValidation, _UserController2.default.register);
cov_kgoph4xyd.s[2]++;
router.post('/users/login/', _validation2.default.loginValidation, _UserController2.default.login);
cov_kgoph4xyd.s[3]++;
router.get('/users/', _token2.default.validateToken, _UserController2.default.getAllUser);

exports.default = router;
module.exports = exports.default;