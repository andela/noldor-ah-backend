'use strict';

var cov_1x96dnub91 = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/index.js',
      hash = 'df8cb0b6a74c2ad953a9e038c67415e1124c602a',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/index.js',
    statementMap: {
      '0': {
        start: {
          line: 9,
          column: 21
        },
        end: {
          line: 9,
          column: 41
        }
      },
      '1': {
        start: {
          line: 12,
          column: 12
        },
        end: {
          line: 12,
          column: 21
        }
      },
      '2': {
        start: {
          line: 13,
          column: 17
        },
        end: {
          line: 13,
          column: 30
        }
      },
      '3': {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 16,
          column: 18
        }
      },
      '4': {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 52
        }
      },
      '5': {
        start: {
          line: 18,
          column: 0
        },
        end: {
          line: 18,
          column: 27
        }
      },
      '6': {
        start: {
          line: 20,
          column: 0
        },
        end: {
          line: 20,
          column: 16
        }
      },
      '7': {
        start: {
          line: 21,
          column: 0
        },
        end: {
          line: 21,
          column: 16
        }
      },
      '8': {
        start: {
          line: 23,
          column: 0
        },
        end: {
          line: 25,
          column: 1
        }
      },
      '9': {
        start: {
          line: 24,
          column: 2
        },
        end: {
          line: 24,
          column: 26
        }
      },
      '10': {
        start: {
          line: 28,
          column: 0
        },
        end: {
          line: 33,
          column: 3
        }
      },
      '11': {
        start: {
          line: 29,
          column: 2
        },
        end: {
          line: 32,
          column: 5
        }
      },
      '12': {
        start: {
          line: 36,
          column: 15
        },
        end: {
          line: 39,
          column: 2
        }
      },
      '13': {
        start: {
          line: 38,
          column: 2
        },
        end: {
          line: 38,
          column: 60
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 28,
            column: 13
          },
          end: {
            line: 28,
            column: 14
          }
        },
        loc: {
          start: {
            line: 28,
            column: 27
          },
          end: {
            line: 33,
            column: 1
          }
        },
        line: 28
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 36,
            column: 52
          },
          end: {
            line: 36,
            column: 53
          }
        },
        loc: {
          start: {
            line: 36,
            column: 58
          },
          end: {
            line: 39,
            column: 1
          }
        },
        line: 36
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 23,
            column: 0
          },
          end: {
            line: 25,
            column: 1
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 23,
            column: 0
          },
          end: {
            line: 25,
            column: 1
          }
        }, {
          start: {
            line: 23,
            column: 0
          },
          end: {
            line: 25,
            column: 1
          }
        }],
        line: 23
      },
      '1': {
        loc: {
          start: {
            line: 36,
            column: 26
          },
          end: {
            line: 36,
            column: 50
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 36,
            column: 26
          },
          end: {
            line: 36,
            column: 42
          }
        }, {
          start: {
            line: 36,
            column: 46
          },
          end: {
            line: 36,
            column: 50
          }
        }],
        line: 36
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
      '12': 0,
      '13': 0
    },
    f: {
      '0': 0,
      '1': 0
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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./server/src/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isProduction = (cov_1x96dnub91.s[0]++, process.env.NODE_ENV);

// Create global app object
var app = (cov_1x96dnub91.s[1]++, (0, _express2.default)());
var moganDev = (cov_1x96dnub91.s[2]++, (0, _morgan2.default)('dev'));

// Normal express config defaults
cov_1x96dnub91.s[3]++;
app.use(moganDev);
cov_1x96dnub91.s[4]++;
app.use(_bodyParser2.default.urlencoded({ extended: false }));
cov_1x96dnub91.s[5]++;
app.use(_bodyParser2.default.json());

cov_1x96dnub91.s[6]++;
app.use((0, _cors2.default)());
cov_1x96dnub91.s[7]++;
app.use(_routes2.default);

cov_1x96dnub91.s[8]++;
if (!isProduction) {
  cov_1x96dnub91.b[0][0]++;
  cov_1x96dnub91.s[9]++;

  app.use((0, _errorhandler2.default)());
} else {
  cov_1x96dnub91.b[0][1]++;
}

// catch 404 and forward to error handler
cov_1x96dnub91.s[10]++;
app.use('*', function (req, res) {
  cov_1x96dnub91.f[0]++;
  cov_1x96dnub91.s[11]++;

  res.status(404).json({
    success: false,
    message: 'Endpoint does not exist'
  });
});

// finally, let's start our server...
var server = (cov_1x96dnub91.s[12]++, app.listen((cov_1x96dnub91.b[1][0]++, process.env.PORT) || (cov_1x96dnub91.b[1][1]++, 3000), function () {
  cov_1x96dnub91.f[1]++;
  cov_1x96dnub91.s[13]++;

  // eslint-disable-next-line no-console
  console.log('Listening on port ' + server.address().port);
}));

exports.default = app;
module.exports = exports.default;