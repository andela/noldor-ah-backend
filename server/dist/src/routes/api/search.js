'use strict';

var cov_2fcv2nnlpg = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/routes/api/search.js',
      hash = 'a4c34aca1ba505d427ee21f0c723ce5664ae85a4',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/routes/api/search.js',
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
          column: 65
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

var _searchValidation = require('../../helpers/validationHelpers/searchValidation');

var _searchValidation2 = _interopRequireDefault(_searchValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_2fcv2nnlpg.s[0]++, _express2.default.Router());

cov_2fcv2nnlpg.s[1]++;
router.post('/search', _searchValidation2.default, _SearchController2.default.search);

exports.default = router;
module.exports = exports.default;