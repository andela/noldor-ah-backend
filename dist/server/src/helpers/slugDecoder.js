'use strict';

var cov_25e37dz45w = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/slugDecoder.js',
      hash = '94622cae986ed236f7e1aea50aa9dcd5a0669046',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/slugDecoder.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 20
        },
        end: {
          line: 18,
          column: 1
        }
      },
      '1': {
        start: {
          line: 7,
          column: 19
        },
        end: {
          line: 7,
          column: 29
        }
      },
      '2': {
        start: {
          line: 8,
          column: 20
        },
        end: {
          line: 8,
          column: 41
        }
      },
      '3': {
        start: {
          line: 11,
          column: 18
        },
        end: {
          line: 11,
          column: 73
        }
      },
      '4': {
        start: {
          line: 12,
          column: 13
        },
        end: {
          line: 12,
          column: 36
        }
      },
      '5': {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 16,
          column: 3
        }
      },
      '6': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 16
        }
      },
      '7': {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 17,
          column: 19
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 6,
            column: 20
          },
          end: {
            line: 6,
            column: 21
          }
        },
        loc: {
          start: {
            line: 6,
            column: 29
          },
          end: {
            line: 18,
            column: 1
          }
        },
        line: 6
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
            line: 16,
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
            line: 16,
            column: 3
          }
        }, {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 16,
            column: 3
          }
        }],
        line: 14
      },
      '1': {
        loc: {
          start: {
            line: 14,
            column: 6
          },
          end: {
            line: 14,
            column: 44
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 14,
            column: 6
          },
          end: {
            line: 14,
            column: 29
          }
        }, {
          start: {
            line: 14,
            column: 33
          },
          end: {
            line: 14,
            column: 44
          }
        }],
        line: 14
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
      '1': [0, 0]
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
cov_25e37dz45w.s[0]++;
/**
 * @description { decodes the slug }
 * @param { object } req
 * @returns { string } articleId
 */
var slugDecoder = function slugDecoder(req) {
  cov_25e37dz45w.f[0]++;

  var _ref = (cov_25e37dz45w.s[1]++, req.params),
      slug = _ref.slug;

  var articleId = (cov_25e37dz45w.s[2]++, slug.split('-').pop());

  // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric/389022#389022
  var pattern = (cov_25e37dz45w.s[3]++, new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'));
  var id = (cov_25e37dz45w.s[4]++, pattern.test(articleId));

  cov_25e37dz45w.s[5]++;
  if ((cov_25e37dz45w.b[1][0]++, articleId.length !== 12) || (cov_25e37dz45w.b[1][1]++, id !== true)) {
    cov_25e37dz45w.b[0][0]++;
    cov_25e37dz45w.s[6]++;

    return null;
  } else {
    cov_25e37dz45w.b[0][1]++;
  }
  cov_25e37dz45w.s[7]++;
  return articleId;
};

exports.default = slugDecoder;
module.exports = exports.default;