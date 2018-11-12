'use strict';

var cov_dznz9i0d3 = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/issueToken.js',
      hash = 'bd967b35417d83585dd2598e86397b91a5bc3abb',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/issueToken.js',
    statementMap: {
      '0': {
        start: {
          line: 8,
          column: 19
        },
        end: {
          line: 15,
          column: 1
        }
      },
      '1': {
        start: {
          line: 9,
          column: 16
        },
        end: {
          line: 13,
          column: 4
        }
      },
      '2': {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 14,
          column: 15
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 8,
            column: 19
          },
          end: {
            line: 8,
            column: 20
          }
        },
        loc: {
          start: {
            line: 8,
            column: 50
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 8
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 8,
            column: 29
          },
          end: {
            line: 8,
            column: 45
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 8,
            column: 41
          },
          end: {
            line: 8,
            column: 45
          }
        }],
        line: 8
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    f: {
      '0': 0
    },
    b: {
      '0': [0]
    },
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

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description { Issues token to users }
 * @param { object } payload
 * @param { object } expiresIn
 * @returns { string } token
 */
cov_dznz9i0d3.s[0]++;
var issueToken = function issueToken(payload) {
  var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (cov_dznz9i0d3.b[0][0]++, '1w');
  cov_dznz9i0d3.f[0]++;

  var token = (cov_dznz9i0d3.s[1]++, _jsonwebtoken2.default.sign({
    payload: payload
  }, process.env.PRIVATE_KEY, {
    expiresIn: expiresIn
  }));
  cov_dznz9i0d3.s[2]++;
  return token;
};

exports.default = issueToken;
module.exports = exports.default;