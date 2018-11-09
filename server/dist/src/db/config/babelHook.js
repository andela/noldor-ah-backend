'use strict';

var cov_16kfyfol5h = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/config/babelHook.js',
      hash = '11a9514b1a0fbe60b263f76523816f419cb2f64f',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/config/babelHook.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 31
        }
      },
      '1': {
        start: {
          line: 3,
          column: 0
        },
        end: {
          line: 3,
          column: 37
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

cov_16kfyfol5h.s[0]++;
require('babel-core/register');

cov_16kfyfol5h.s[1]++;
module.exports = require('./config');