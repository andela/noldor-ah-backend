'use strict';

var cov_15pldypfna = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/userValidations/token.js',
      hash = '682bddc6c0b63bbcd25bcc738fda7ec2522b95d3',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/userValidations/token.js',
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
          line: 13,
          column: 22
        },
        end: {
          line: 41,
          column: 1
        }
      },
      '2': {
        start: {
          line: 14,
          column: 22
        },
        end: {
          line: 14,
          column: 43
        }
      },
      '3': {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 20,
          column: 3
        }
      },
      '4': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 19,
          column: 7
        }
      },
      '5': {
        start: {
          line: 21,
          column: 2
        },
        end: {
          line: 40,
          column: 3
        }
      },
      '6': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 34,
          column: 7
        }
      },
      '7': {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 29,
          column: 7
        }
      },
      '8': {
        start: {
          line: 24,
          column: 8
        },
        end: {
          line: 28,
          column: 11
        }
      },
      '9': {
        start: {
          line: 30,
          column: 6
        },
        end: {
          line: 33,
          column: 7
        }
      },
      '10': {
        start: {
          line: 31,
          column: 8
        },
        end: {
          line: 31,
          column: 27
        }
      },
      '11': {
        start: {
          line: 32,
          column: 8
        },
        end: {
          line: 32,
          column: 22
        }
      },
      '12': {
        start: {
          line: 36,
          column: 4
        },
        end: {
          line: 39,
          column: 7
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 13,
            column: 22
          },
          end: {
            line: 13,
            column: 23
          }
        },
        loc: {
          start: {
            line: 13,
            column: 42
          },
          end: {
            line: 41,
            column: 1
          }
        },
        line: 13
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 22,
            column: 53
          },
          end: {
            line: 22,
            column: 54
          }
        },
        loc: {
          start: {
            line: 22,
            column: 71
          },
          end: {
            line: 34,
            column: 5
          }
        },
        line: 22
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        }, {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        }],
        line: 15
      },
      '1': {
        loc: {
          start: {
            line: 23,
            column: 6
          },
          end: {
            line: 29,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 23,
            column: 6
          },
          end: {
            line: 29,
            column: 7
          }
        }, {
          start: {
            line: 23,
            column: 6
          },
          end: {
            line: 29,
            column: 7
          }
        }],
        line: 23
      },
      '2': {
        loc: {
          start: {
            line: 30,
            column: 6
          },
          end: {
            line: 33,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 30,
            column: 6
          },
          end: {
            line: 33,
            column: 7
          }
        }, {
          start: {
            line: 30,
            column: 6
          },
          end: {
            line: 33,
            column: 7
          }
        }],
        line: 30
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
      '10': 0,
      '11': 0,
      '12': 0
    },
    f: {
      '0': 0,
      '1': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0]
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

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_15pldypfna.s[0]++;


_dotenv2.default.config();

/**
* @description { validates user token }
* @param { object } req
* @param { object } res
* @param { function } next
* @returns { object } user object on request body
*/
cov_15pldypfna.s[1]++;
var validateToken = function validateToken(req, res, next) {
  cov_15pldypfna.f[0]++;

  var headerToken = (cov_15pldypfna.s[2]++, req.header('x-token'));
  cov_15pldypfna.s[3]++;
  if (!headerToken) {
    cov_15pldypfna.b[0][0]++;
    cov_15pldypfna.s[4]++;

    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  } else {
    cov_15pldypfna.b[0][1]++;
  }
  cov_15pldypfna.s[5]++;
  try {
    cov_15pldypfna.s[6]++;

    _jsonwebtoken2.default.verify(headerToken, process.env.PRIVATE_KEY, function (err, decoded) {
      cov_15pldypfna.f[1]++;
      cov_15pldypfna.s[7]++;

      if (err) {
        cov_15pldypfna.b[1][0]++;
        cov_15pldypfna.s[8]++;

        return res.status(401).json({
          success: false,
          message: 'invalid token',
          expiredAt: err.expiredAt
        });
      } else {
        cov_15pldypfna.b[1][1]++;
      }
      cov_15pldypfna.s[9]++;
      if (!err) {
        cov_15pldypfna.b[2][0]++;
        cov_15pldypfna.s[10]++;

        req.user = decoded;
        cov_15pldypfna.s[11]++;
        return next();
      } else {
        cov_15pldypfna.b[2][1]++;
      }
    });
  } catch (err) {
    cov_15pldypfna.s[12]++;

    res.status(400).json({
      success: false,
      message: 'Invalid token provided.'
    });
  }
};

exports.default = validateToken;
module.exports = exports.default;