'use strict';

var cov_1koovgsmjz = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/search.js',
      hash = '42ef3d317208db8dd0dcfcef2d03b9f823aea4bc',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/search.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 15
        },
        end: {
          line: 5,
          column: 31
        }
      },
      '1': {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 67
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0
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

var _SearchController = require('../../controllers/SearchController');

var _SearchController2 = _interopRequireDefault(_SearchController);

var _validators = require('../../middlewares/validators');

var _validators2 = _interopRequireDefault(_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_1koovgsmjz.s[0]++, _express2.default.Router());

cov_1koovgsmjz.s[1]++;
router.post('/search', _validators2.default.search, _SearchController2.default.search);

exports.default = router;
module.exports = exports.default;