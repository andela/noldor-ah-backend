'use strict';

var cov_2mua8mc686 = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/workers/ReactionWorker.js',
      hash = '94858a975a086044aa5f9b2bae559b7ed556432c',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/workers/ReactionWorker.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 15
        },
        end: {
          line: 5,
          column: 24
        }
      },
      '1': {
        start: {
          line: 6,
          column: 20
        },
        end: {
          line: 6,
          column: 26
        }
      },
      '2': {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 51,
          column: 5
        }
      },
      '3': {
        start: {
          line: 22,
          column: 27
        },
        end: {
          line: 28,
          column: 8
        }
      },
      '4': {
        start: {
          line: 29,
          column: 6
        },
        end: {
          line: 36,
          column: 7
        }
      },
      '5': {
        start: {
          line: 30,
          column: 8
        },
        end: {
          line: 35,
          column: 11
        }
      },
      '6': {
        start: {
          line: 37,
          column: 21
        },
        end: {
          line: 37,
          column: 69
        }
      },
      '7': {
        start: {
          line: 38,
          column: 22
        },
        end: {
          line: 41,
          column: 7
        }
      },
      '8': {
        start: {
          line: 43,
          column: 6
        },
        end: {
          line: 43,
          column: 21
        }
      },
      '9': {
        start: {
          line: 45,
          column: 6
        },
        end: {
          line: 50,
          column: 9
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 20,
            column: 2
          },
          end: {
            line: 20,
            column: 3
          }
        },
        loc: {
          start: {
            line: 20,
            column: 37
          },
          end: {
            line: 52,
            column: 3
          }
        },
        line: 20
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 29,
            column: 6
          },
          end: {
            line: 36,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 29,
            column: 6
          },
          end: {
            line: 36,
            column: 7
          }
        }, {
          start: {
            line: 29,
            column: 6
          },
          end: {
            line: 36,
            column: 7
          }
        }],
        line: 29
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
      '9': 0
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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

var _index = require('../helpers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (cov_2mua8mc686.s[0]++, _sequelize2.default),
    Op = _ref.Op;

var _ref2 = (cov_2mua8mc686.s[1]++, _models2.default),
    Article = _ref2.Article;

/**
 * @class { ReactionHelper }
 * @description { Handles for like and unlike helpers }
 */


var ReactionWorker = function () {
  function ReactionWorker() {
    (0, _classCallCheck3.default)(this, ReactionWorker);
  }

  (0, _createClass3.default)(ReactionWorker, null, [{
    key: 'findArticle',

    /**
       * @description { Check if article has been reacted to by user }
       * @param { object } req
       * @param { object } res
       * @returns { boolean } TRUE/FALSE
       *
       */
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var articleExist, status, article;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_2mua8mc686.f[0]++;
                cov_2mua8mc686.s[2]++;
                _context.prev = 2;
                cov_2mua8mc686.s[3]++;
                _context.next = 6;
                return Article.findOne({
                  where: {
                    slug: (0, _defineProperty3.default)({}, Op.like, '%' + _index2.default.slugDecoder(req))
                  }
                });

              case 6:
                articleExist = _context.sent;
                cov_2mua8mc686.s[4]++;

                if (articleExist) {
                  _context.next = 14;
                  break;
                }

                cov_2mua8mc686.b[0][0]++;
                cov_2mua8mc686.s[5]++;
                return _context.abrupt('return', res.status(404).json({
                  success: false,
                  error: {
                    message: 'article not found'
                  }
                }));

              case 14:
                cov_2mua8mc686.b[0][1]++;

              case 15:
                cov_2mua8mc686.s[6]++;
                _context.next = 18;
                return articleExist.hasUsers(req.user.payload.id);

              case 18:
                status = _context.sent;
                article = (cov_2mua8mc686.s[7]++, {
                  status: status,
                  article: articleExist
                });
                cov_2mua8mc686.s[8]++;
                return _context.abrupt('return', article);

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](2);
                cov_2mua8mc686.s[9]++;
                return _context.abrupt('return', res.status(500).json({
                  success: false,
                  error: {
                    msg: _context.t0.message
                  }
                }));

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 24]]);
      }));

      function findArticle(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return findArticle;
    }()
  }]);
  return ReactionWorker;
}();

exports.default = ReactionWorker;
module.exports = exports.default;