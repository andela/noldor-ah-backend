'use strict';

var cov_cz184wzoc = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/middlewares/token.js',
      hash = '00af50707072a5395d1d1abea6cf1e6187989f54',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/middlewares/token.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 0
        },
        end: {
          line: 4,
          column: 16
        }
      },
      '1': {
        start: {
          line: 18,
          column: 18
        },
        end: {
          line: 22,
          column: 6
        }
      },
      '2': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 17
        }
      },
      '3': {
        start: {
          line: 34,
          column: 24
        },
        end: {
          line: 34,
          column: 45
        }
      },
      '4': {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 40,
          column: 5
        }
      },
      '5': {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 39,
          column: 9
        }
      },
      '6': {
        start: {
          line: 41,
          column: 4
        },
        end: {
          line: 50,
          column: 5
        }
      },
      '7': {
        start: {
          line: 42,
          column: 27
        },
        end: {
          line: 42,
          column: 75
        }
      },
      '8': {
        start: {
          line: 43,
          column: 6
        },
        end: {
          line: 43,
          column: 30
        }
      },
      '9': {
        start: {
          line: 44,
          column: 6
        },
        end: {
          line: 44,
          column: 20
        }
      },
      '10': {
        start: {
          line: 46,
          column: 6
        },
        end: {
          line: 49,
          column: 9
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 17,
            column: 3
          }
        },
        loc: {
          start: {
            line: 17,
            column: 24
          },
          end: {
            line: 24,
            column: 3
          }
        },
        line: 17
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 33,
            column: 2
          },
          end: {
            line: 33,
            column: 3
          }
        },
        loc: {
          start: {
            line: 33,
            column: 39
          },
          end: {
            line: 51,
            column: 3
          }
        },
        line: 33
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 40,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 40,
            column: 5
          }
        }, {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 40,
            column: 5
          }
        }],
        line: 35
      }
    },
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
      '10': 0
    },
    f: {
      '0': 0,
      '1': 0
    },
    b: {
      '0': [0, 0]
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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_cz184wzoc.s[0]++;


_dotenv2.default.config();
/**
 *@class{Token}
 *@description { Issue token to users on successful registration}
 *@description{ validate user token }
 */

var Token = function () {
  function Token() {
    (0, _classCallCheck3.default)(this, Token);
  }

  (0, _createClass3.default)(Token, null, [{
    key: 'issue',

    /**
     * @description { Issues token to users }
     * @param { object } payload
     * @param { object } lifeSpan
     * @returns { string } token
     */
    value: function issue(payload) {
      cov_cz184wzoc.f[0]++;

      var token = (cov_cz184wzoc.s[1]++, _jsonwebtoken2.default.sign({
        payload: payload
      }, process.env.PRIVATE_KEY, {
        expiresIn: '1w'
      }));
      cov_cz184wzoc.s[2]++;
      return token;
    }

    /**
    *@description { validates user token }
    * @param { object } req
    * @param { object } res
    * @param { function } next
    * @returns { object } user object on request body
    */

  }, {
    key: 'validateToken',
    value: function validateToken(req, res, next) {
      cov_cz184wzoc.f[1]++;

      var headerToken = (cov_cz184wzoc.s[3]++, req.header('x-token'));
      cov_cz184wzoc.s[4]++;
      if (!headerToken) {
        cov_cz184wzoc.b[0][0]++;
        cov_cz184wzoc.s[5]++;

        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      } else {
        cov_cz184wzoc.b[0][1]++;
      }
      cov_cz184wzoc.s[6]++;
      try {
        var decodedToken = (cov_cz184wzoc.s[7]++, _jsonwebtoken2.default.verify(headerToken, process.env.PRIVATE_KEY));
        cov_cz184wzoc.s[8]++;
        req.user = decodedToken;
        cov_cz184wzoc.s[9]++;
        return next();
      } catch (err) {
        cov_cz184wzoc.s[10]++;

        res.status(400).json({
          success: false,
          message: 'Invalid token provided.'
        });
      }
    }
  }]);
  return Token;
}();

exports.default = Token;
module.exports = exports.default;