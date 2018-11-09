'use strict';

var cov_6fpdcwepg = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/routes/api/article.js',
      hash = '7831533067ac3bcf1db37254524290969071b118',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/routes/api/article.js',
    statementMap: {
      '0': {
        start: {
          line: 7,
          column: 22
        },
        end: {
          line: 7,
          column: 51
        }
      },
      '1': {
        start: {
          line: 8,
          column: 15
        },
        end: {
          line: 8,
          column: 31
        }
      },
      '2': {
        start: {
          line: 10,
          column: 0
        },
        end: {
          line: 10,
          column: 50
        }
      },
      '3': {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 11,
          column: 80
        }
      },
      '4': {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 12,
          column: 76
        }
      },
      '5': {
        start: {
          line: 13,
          column: 0
        },
        end: {
          line: 13,
          column: 62
        }
      },
      '6': {
        start: {
          line: 14,
          column: 0
        },
        end: {
          line: 14,
          column: 103
        }
      },
      '7': {
        start: {
          line: 15,
          column: 0
        },
        end: {
          line: 15,
          column: 87
        }
      },
      '8': {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 16,
          column: 78
        }
      },
      '9': {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 81
        }
      },
      '10': {
        start: {
          line: 18,
          column: 0
        },
        end: {
          line: 18,
          column: 53
        }
      }
    },
    fnMap: {},
    branchMap: {},
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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ArticleController = require('../../controllers/ArticleController');

var _ArticleController2 = _interopRequireDefault(_ArticleController);

var _token = require('../../middlewares/token');

var _token2 = _interopRequireDefault(_token);

var _articlePagination = require('../../helpers/articlePagination');

var _articlePagination2 = _interopRequireDefault(_articlePagination);

var _articleValidation = require('../../helpers/validationHelpers/articleValidation');

var _articleValidation2 = _interopRequireDefault(_articleValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorization = (cov_6fpdcwepg.s[0]++, _token2.default.validateToken);
var router = (cov_6fpdcwepg.s[1]++, _express2.default.Router());

cov_6fpdcwepg.s[2]++;
router.get('/articles', _ArticleController2.default.getAll);
cov_6fpdcwepg.s[3]++;
router.get('/users/articles', authorization, _ArticleController2.default.getUserArticles);
cov_6fpdcwepg.s[4]++;
router.get('/articles/drafts', authorization, _ArticleController2.default.userDrafts);
cov_6fpdcwepg.s[5]++;
router.get('/articles/:slug', _ArticleController2.default.getAnArticle);
cov_6fpdcwepg.s[6]++;
router.post('/articles', authorization, _articleValidation2.default.postArticle, _ArticleController2.default.postArticle);
cov_6fpdcwepg.s[7]++;
router.put('/articles/:slug/publish', authorization, _ArticleController2.default.publishArticle);
cov_6fpdcwepg.s[8]++;
router.put('/articles/:slug', authorization, _ArticleController2.default.updateArticle);
cov_6fpdcwepg.s[9]++;
router.delete('/articles/:slug', authorization, _ArticleController2.default.deleteArticle);
cov_6fpdcwepg.s[10]++;
router.get('/articles/page/:source', _articlePagination2.default.page);

exports.default = router;
module.exports = exports.default;