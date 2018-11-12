'use strict';

var cov_1c0ctm9ecf = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/workers/TagWorker.js',
      hash = '87a9b7d1513abdf44d5ee281ea43231ebf78ba57',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/workers/TagWorker.js',
    statementMap: {
      '0': {
        start: {
          line: 3,
          column: 17
        },
        end: {
          line: 3,
          column: 23
        }
      },
      '1': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 26,
          column: 7
        }
      },
      '2': {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 25,
          column: 11
        }
      },
      '3': {
        start: {
          line: 23,
          column: 30
        },
        end: {
          line: 23,
          column: 54
        }
      },
      '4': {
        start: {
          line: 24,
          column: 10
        },
        end: {
          line: 24,
          column: 42
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
            column: 38
          },
          end: {
            line: 27,
            column: 3
          }
        },
        line: 17
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 18,
            column: 17
          },
          end: {
            line: 18,
            column: 18
          }
        },
        loc: {
          start: {
            line: 18,
            column: 28
          },
          end: {
            line: 26,
            column: 5
          }
        },
        line: 18
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 22,
            column: 16
          },
          end: {
            line: 22,
            column: 17
          }
        },
        loc: {
          start: {
            line: 22,
            column: 25
          },
          end: {
            line: 25,
            column: 9
          }
        },
        line: 22
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0
    },
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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (cov_1c0ctm9ecf.s[0]++, _models2.default),
    Tags = _ref.Tags;

/**
 * @class { TagWorker }
 * @description { Handles tag operations }
 */


var TagWorker = function () {
  function TagWorker() {
    (0, _classCallCheck3.default)(this, TagWorker);
  }

  (0, _createClass3.default)(TagWorker, null, [{
    key: 'addTags',

    /**
     * @description { Add tags to the DB }
     * @param { object } tags
     * @param { object } article
     * @returns { null } nothing
     *
     */
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tags, article) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cov_1c0ctm9ecf.f[0]++;
                cov_1c0ctm9ecf.s[1]++;

                tags.forEach(function (entry) {
                  cov_1c0ctm9ecf.f[1]++;
                  cov_1c0ctm9ecf.s[2]++;

                  Tags.findOrCreate({
                    where: { name: entry }
                  }).spread(function (tag) {
                    cov_1c0ctm9ecf.f[2]++;

                    var returnedTag = (cov_1c0ctm9ecf.s[3]++, tag.get({ plain: true }));
                    cov_1c0ctm9ecf.s[4]++;
                    article.addTags(returnedTag.id);
                  });
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addTags(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return addTags;
    }()
  }]);
  return TagWorker;
}();

exports.default = TagWorker;
module.exports = exports.default;