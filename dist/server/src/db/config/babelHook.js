'use strict';

var cov_hjq9m0js1 = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/config/babelHook.js',
      hash = '1c88a7dfacbf74ce7bc646c876cf0bc8f827f6b4',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/config/babelHook.js',
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

cov_hjq9m0js1.s[0]++;
require('babel-core/register');

cov_hjq9m0js1.s[1]++;
module.exports = require('./config');