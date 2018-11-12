'use strict';

var cov_xb7063pij = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/articleValidations/search.js',
      hash = '07cb5d06ea5a7aec47a599e90692f8ab6c1b0e18',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/articleValidations/search.js',
    statementMap: {
      '0': {
        start: {
          line: 8,
          column: 25
        },
        end: {
          line: 18,
          column: 1
        }
      },
      '1': {
        start: {
          line: 9,
          column: 2
        },
        end: {
          line: 16,
          column: 3
        }
      },
      '2': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 15,
          column: 7
        }
      },
      '3': {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 17,
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
            column: 25
          },
          end: {
            line: 8,
            column: 26
          }
        },
        loc: {
          start: {
            line: 8,
            column: 45
          },
          end: {
            line: 18,
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
            line: 9,
            column: 2
          },
          end: {
            line: 16,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 16,
            column: 3
          }
        }, {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 16,
            column: 3
          }
        }],
        line: 9
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    f: {
      '0': 0
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
cov_xb7063pij.s[0]++;
/**
 * @description { Validate Search Requests Input }
 * @param { object } req
 * @param { object } res
 * @param { object } next
 * @returns { object } Json
 */
var searchValidation = function searchValidation(req, res, next) {
  cov_xb7063pij.f[0]++;
  cov_xb7063pij.s[1]++;

  if (!req.body.keywords) {
    cov_xb7063pij.b[0][0]++;
    cov_xb7063pij.s[2]++;

    return res.status(400).json({
      success: false,
      error: {
        msg: 'search keyword must be provided'
      }
    });
  } else {
    cov_xb7063pij.b[0][1]++;
  }
  cov_xb7063pij.s[3]++;
  next();
};

exports.default = searchValidation;
module.exports = exports.default;