'use strict';

var cov_194ekktxhd = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/config/config.js',
      hash = '7fdd92c6d822a07f34212c85c21659031f964afb',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/config/config.js',
    statementMap: {
      '0': {
        start: {
          line: 3,
          column: 0
        },
        end: {
          line: 3,
          column: 16
        }
      },
      '1': {
        start: {
          line: 5,
          column: 15
        },
        end: {
          line: 32,
          column: 1
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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_194ekktxhd.s[0]++;


_dotenv2.default.config();

var config = (cov_194ekktxhd.s[1]++, {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false
  },
  test: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.HOST,
    use_env_variable: 'DATABASE_URL_TEST',
    port: '5433',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    port: '5432',
    dialect: 'postgres'
  }
});

exports.default = config;
module.exports = exports.default;