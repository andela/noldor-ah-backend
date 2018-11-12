'use strict';

var cov_jdsx7rk2j = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/userValidations/forgotPassword.js',
      hash = '6892689e86fb0e9db6df0dc7ad2e25fa2d0623cb',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/userValidations/forgotPassword.js',
    statementMap: {
      '0': {
        start: {
          line: 8,
          column: 33
        },
        end: {
          line: 27,
          column: 1
        }
      },
      '1': {
        start: {
          line: 12,
          column: 22
        },
        end: {
          line: 12,
          column: 84
        }
      },
      '2': {
        start: {
          line: 13,
          column: 20
        },
        end: {
          line: 13,
          column: 28
        }
      },
      '3': {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 19,
          column: 3
        }
      },
      '4': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 18,
          column: 7
        }
      },
      '5': {
        start: {
          line: 20,
          column: 2
        },
        end: {
          line: 25,
          column: 3
        }
      },
      '6': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 24,
          column: 7
        }
      },
      '7': {
        start: {
          line: 26,
          column: 2
        },
        end: {
          line: 26,
          column: 9
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 8,
            column: 33
          },
          end: {
            line: 8,
            column: 34
          }
        },
        loc: {
          start: {
            line: 8,
            column: 53
          },
          end: {
            line: 27,
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
            line: 14,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        }, {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        }],
        line: 14
      },
      '1': {
        loc: {
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        }, {
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        }],
        line: 20
      },
      '2': {
        loc: {
          start: {
            line: 20,
            column: 6
          },
          end: {
            line: 20,
            column: 111
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 20,
            column: 6
          },
          end: {
            line: 20,
            column: 31
          }
        }, {
          start: {
            line: 20,
            column: 35
          },
          end: {
            line: 20,
            column: 54
          }
        }, {
          start: {
            line: 20,
            column: 58
          },
          end: {
            line: 20,
            column: 111
          }
        }],
        line: 20
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
      '7': 0
    },
    f: {
      '0': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0, 0]
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
cov_jdsx7rk2j.s[0]++;
/**
   *  @description { validates email input field on forget password }
   * @param { object } req
   * @param { object } res
   * @param { callback } next
   * @returns { callback } json/callback
   */
var forgotPasswordValidation = function forgotPasswordValidation(req, res, next) {
  cov_jdsx7rk2j.f[0]++;

  /**
  * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  */
  var emailFilter = (cov_jdsx7rk2j.s[1]++, /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/);

  var _ref = (cov_jdsx7rk2j.s[2]++, req.body),
      email = _ref.email;

  cov_jdsx7rk2j.s[3]++;

  if (!req.body.email) {
    cov_jdsx7rk2j.b[0][0]++;
    cov_jdsx7rk2j.s[4]++;

    return res.status(400).json({
      success: false,
      message: 'email is required'
    });
  } else {
    cov_jdsx7rk2j.b[0][1]++;
  }
  cov_jdsx7rk2j.s[5]++;
  if ((cov_jdsx7rk2j.b[2][0]++, typeof email !== 'string') || (cov_jdsx7rk2j.b[2][1]++, email.trim() === '') || (cov_jdsx7rk2j.b[2][2]++, emailFilter.test(email.toLocaleLowerCase()) === false)) {
    cov_jdsx7rk2j.b[1][0]++;
    cov_jdsx7rk2j.s[6]++;

    return res.status(400).json({
      success: false,
      message: 'invalid email'
    });
  } else {
    cov_jdsx7rk2j.b[1][1]++;
  }
  cov_jdsx7rk2j.s[7]++;
  next();
};

exports.default = forgotPasswordValidation;
module.exports = exports.default;