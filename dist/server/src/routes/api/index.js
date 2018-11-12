'use strict';

var cov_gspucagyf = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/index.js',
      hash = 'adca441ff67cca1216f732cc554e92155874393d',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/index.js',
    statementMap: {
      '0': {
        start: {
          line: 7,
          column: 15
        },
        end: {
          line: 7,
          column: 31
        }
      },
      '1': {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 28
        }
      },
      '2': {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 31
        }
      },
      '3': {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 11,
          column: 30
        }
      },
      '4': {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 18,
          column: 3
        }
      },
      '5': {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 17,
          column: 59
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 16,
            column: 16
          },
          end: {
            line: 16,
            column: 17
          }
        },
        loc: {
          start: {
            line: 16,
            column: 30
          },
          end: {
            line: 18,
            column: 1
          }
        },
        line: 16
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    },
    f: {
      '0': 0
    },
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

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_gspucagyf.s[0]++, _express2.default.Router());

cov_gspucagyf.s[1]++;
router.use('/api/v1', _user2.default);
cov_gspucagyf.s[2]++;
router.use('/api/v1', _article2.default);
cov_gspucagyf.s[3]++;
router.use('/api/v1', _search2.default);

/**
 * Home route
 */
cov_gspucagyf.s[4]++;
router.get('/', function (req, res) {
  cov_gspucagyf.f[0]++;
  cov_gspucagyf.s[5]++;

  res.status(200).send('<h1>Welcome to Author Haven</h1>');
});

exports.default = router;
module.exports = exports.default;