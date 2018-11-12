'use strict';

var cov_26obqwhj2t = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/controllers/ReactionController.js',
      hash = '9ac902dec8090c98ae42ca51667f5c31edbdfd49',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/controllers/ReactionController.js',
    statementMap: {
      '0': {
        start: {
          line: 16,
          column: 18
        },
        end: {
          line: 16,
          column: 60
        }
      },
      '1': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 33,
          column: 5
        }
      },
      '2': {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 32,
          column: 7
        }
      },
      '3': {
        start: {
          line: 19,
          column: 27
        },
        end: {
          line: 19,
          column: 79
        }
      },
      '4': {
        start: {
          line: 21,
          column: 8
        },
        end: {
          line: 24,
          column: 9
        }
      },
      '5': {
        start: {
          line: 22,
          column: 10
        },
        end: {
          line: 22,
          column: 42
        }
      },
      '6': {
        start: {
          line: 23,
          column: 10
        },
        end: {
          line: 23,
          column: 22
        }
      },
      '7': {
        start: {
          line: 26,
          column: 8
        },
        end: {
          line: 31,
          column: 11
        }
      },
      '8': {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 52,
          column: 5
        }
      },
      '9': {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 51,
          column: 7
        }
      },
      '10': {
        start: {
          line: 37,
          column: 24
        },
        end: {
          line: 37,
          column: 67
        }
      },
      '11': {
        start: {
          line: 38,
          column: 8
        },
        end: {
          line: 43,
          column: 9
        }
      },
      '12': {
        start: {
          line: 39,
          column: 10
        },
        end: {
          line: 42,
          column: 13
        }
      },
      '13': {
        start: {
          line: 45,
          column: 8
        },
        end: {
          line: 50,
          column: 11
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 15,
            column: 3
          }
        },
        loc: {
          start: {
            line: 15,
            column: 37
          },
          end: {
            line: 53,
            column: 3
          }
        },
        line: 15
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }, {
          start: {
            line: 17,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }],
        line: 17
      },
      '1': {
        loc: {
          start: {
            line: 21,
            column: 8
          },
          end: {
            line: 24,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 21,
            column: 8
          },
          end: {
            line: 24,
            column: 9
          }
        }, {
          start: {
            line: 21,
            column: 8
          },
          end: {
            line: 24,
            column: 9
          }
        }],
        line: 21
      },
      '2': {
        loc: {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 52,
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
            line: 52,
            column: 5
          }
        }, {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 52,
            column: 5
          }
        }],
        line: 35
      },
      '3': {
        loc: {
          start: {
            line: 38,
            column: 8
          },
          end: {
            line: 43,
            column: 9
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 38,
            column: 8
          },
          end: {
            line: 43,
            column: 9
          }
        }, {
          start: {
            line: 38,
            column: 8
          },
          end: {
            line: 43,
            column: 9
          }
        }],
        line: 38
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
      '0': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0],
      '2': [0, 0],
      '3': [0, 0]
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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ReactionWorker = require('../workers/ReactionWorker');

var _ReactionWorker2 = _interopRequireDefault(_ReactionWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class { ReactionController}
 * @description { Controller class for user like and unlike reaction}
 *
 */
var ReactionController = function () {
  function ReactionController() {
    (0, _classCallCheck3.default)(this, ReactionController);
  }

  (0, _createClass3.default)(ReactionController, null, [{
    key: 'likeArticle',

    /**
       * @description { Handles like and unlike reaction}
       * @param { object } req
       * @param { object } res
       * @return { object } JSON
       */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var check, removeLike, addLike;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_26obqwhj2t.f[0]++;
                cov_26obqwhj2t.s[0]++;
                _context.next = 4;
                return _ReactionWorker2.default.findArticle(req, res);

              case 4:
                check = _context.sent;
                cov_26obqwhj2t.s[1]++;

                if (!(check.status === true)) {
                  _context.next = 32;
                  break;
                }

                cov_26obqwhj2t.b[0][0]++;
                cov_26obqwhj2t.s[2]++;
                _context.prev = 9;
                cov_26obqwhj2t.s[3]++;
                _context.next = 13;
                return check.article.removeUsers(req.user.payload.id);

              case 13:
                removeLike = _context.sent;
                cov_26obqwhj2t.s[4]++;

                if (!removeLike) {
                  _context.next = 23;
                  break;
                }

                cov_26obqwhj2t.b[1][0]++;
                cov_26obqwhj2t.s[5]++;

                res.status(204).json('deleted');
                cov_26obqwhj2t.s[6]++;
                return _context.abrupt('return', null);

              case 23:
                cov_26obqwhj2t.b[1][1]++;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context['catch'](9);
                cov_26obqwhj2t.s[7]++;
                return _context.abrupt('return', res.status(500).json({
                  success: false,
                  error: {
                    msg: _context.t0.message
                  }
                }));

              case 30:
                _context.next = 33;
                break;

              case 32:
                cov_26obqwhj2t.b[0][1]++;

              case 33:
                cov_26obqwhj2t.s[8]++;

                if (!(check.status === false)) {
                  _context.next = 55;
                  break;
                }

                cov_26obqwhj2t.b[2][0]++;
                cov_26obqwhj2t.s[9]++;
                _context.prev = 37;
                addLike = (cov_26obqwhj2t.s[10]++, check.article.addUsers(req.user.payload.id));
                cov_26obqwhj2t.s[11]++;

                if (!addLike) {
                  _context.next = 46;
                  break;
                }

                cov_26obqwhj2t.b[3][0]++;
                cov_26obqwhj2t.s[12]++;
                return _context.abrupt('return', res.status(201).json({
                  success: true,
                  message: 'article has been liked'
                }));

              case 46:
                cov_26obqwhj2t.b[3][1]++;

              case 47:
                _context.next = 53;
                break;

              case 49:
                _context.prev = 49;
                _context.t1 = _context['catch'](37);
                cov_26obqwhj2t.s[13]++;
                return _context.abrupt('return', res.status(500).json({
                  success: false,
                  error: {
                    msg: _context.t1.message
                  }
                }));

              case 53:
                _context.next = 56;
                break;

              case 55:
                cov_26obqwhj2t.b[2][1]++;

              case 56:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 26], [37, 49]]);
      }));

      function likeArticle(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return likeArticle;
    }()
  }]);
  return ReactionController;
}();

exports.default = ReactionController;
module.exports = exports.default;