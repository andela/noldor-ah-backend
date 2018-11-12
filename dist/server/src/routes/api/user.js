'use strict';

var cov_cx8bq8sou = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/user.js',
      hash = '94d54b8c9a91444f2fdda58899bfedf3ec5862a5',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/user.js',
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
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 18
        }
      },
      '2': {
        start: {
          line: 18,
          column: 0
        },
        end: {
          line: 18,
          column: 60
        }
      },
      '3': {
        start: {
          line: 19,
          column: 0
        },
        end: {
          line: 19,
          column: 54
        }
      },
      '4': {
        start: {
          line: 20,
          column: 0
        },
        end: {
          line: 20,
          column: 52
        }
      },
      '5': {
        start: {
          line: 21,
          column: 0
        },
        end: {
          line: 21,
          column: 71
        }
      },
      '6': {
        start: {
          line: 22,
          column: 0
        },
        end: {
          line: 22,
          column: 76
        }
      },
      '7': {
        start: {
          line: 23,
          column: 0
        },
        end: {
          line: 23,
          column: 75
        }
      },
      '8': {
        start: {
          line: 24,
          column: 0
        },
        end: {
          line: 24,
          column: 68
        }
      },
      '9': {
        start: {
          line: 25,
          column: 0
        },
        end: {
          line: 25,
          column: 55
        }
      },
      '10': {
        start: {
          line: 26,
          column: 0
        },
        end: {
          line: 26,
          column: 84
        }
      },
      '11': {
        start: {
          line: 27,
          column: 0
        },
        end: {
          line: 27,
          column: 77
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0
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

var _validators = require('../../middlewares/validators');

var _validators2 = _interopRequireDefault(_validators);

var _multifile = require('../../helpers/multifile');

var _multifile2 = _interopRequireDefault(_multifile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_cx8bq8sou.s[0]++, _express2.default.Router());

var _ref = (cov_cx8bq8sou.s[1]++, _UserController2.default),
    register = _ref.register,
    login = _ref.login,
    getAllUser = _ref.getAllUser,
    forgetPassword = _ref.forgetPassword,
    resetPassword = _ref.resetPassword,
    viewUserProfile = _ref.viewUserProfile,
    editUserProfile = _ref.editUserProfile,
    deactivateUser = _ref.deactivateUser;

cov_cx8bq8sou.s[2]++;


router.post('/users/register', _validators2.default.signup, register);
cov_cx8bq8sou.s[3]++;
router.post('/users/login/', _validators2.default.login, login);
cov_cx8bq8sou.s[4]++;
router.get('/users/', _validators2.default.token, getAllUser);
cov_cx8bq8sou.s[5]++;
router.put('/users/forgot', _validators2.default.forgotPassword, forgetPassword);
cov_cx8bq8sou.s[6]++;
router.post('/users/forgot/:hash', _validators2.default.resetPassword, resetPassword);
cov_cx8bq8sou.s[7]++;
router.post('/users/register', _validators2.default.signup, _UserController2.default.register);
cov_cx8bq8sou.s[8]++;
router.post('/users/login', _validators2.default.login, _UserController2.default.login);
cov_cx8bq8sou.s[9]++;
router.get('/users/:userId/profiles', viewUserProfile);
cov_cx8bq8sou.s[10]++;
router.put('/users/:userId/profiles', _validators2.default.token, _multifile2.default, editUserProfile);
cov_cx8bq8sou.s[11]++;
router.delete('/users/:userId/deactivate', _validators2.default.token, deactivateUser);

exports.default = router;
module.exports = exports.default;