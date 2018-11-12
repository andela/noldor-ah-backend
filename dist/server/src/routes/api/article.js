'use strict';

var cov_nlr24yd6g = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/article.js',
      hash = '62955b2fb6d0b814a114fccb797a1e0188f4f9b4',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/routes/api/article.js',
    statementMap: {
      '0': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 21
        }
      },
      '1': {
        start: {
          line: 12,
          column: 15
        },
        end: {
          line: 12,
          column: 31
        }
      },
      '2': {
        start: {
          line: 14,
          column: 0
        },
        end: {
          line: 14,
          column: 37
        }
      },
      '3': {
        start: {
          line: 15,
          column: 0
        },
        end: {
          line: 15,
          column: 62
        }
      },
      '4': {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 16,
          column: 61
        }
      },
      '5': {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 44
        }
      },
      '6': {
        start: {
          line: 18,
          column: 0
        },
        end: {
          line: 18,
          column: 97
        }
      },
      '7': {
        start: {
          line: 19,
          column: 0
        },
        end: {
          line: 19,
          column: 72
        }
      },
      '8': {
        start: {
          line: 20,
          column: 0
        },
        end: {
          line: 20,
          column: 63
        }
      },
      '9': {
        start: {
          line: 21,
          column: 0
        },
        end: {
          line: 21,
          column: 66
        }
      },
      '10': {
        start: {
          line: 22,
          column: 0
        },
        end: {
          line: 22,
          column: 53
        }
      },
      '11': {
        start: {
          line: 23,
          column: 0
        },
        end: {
          line: 23,
          column: 82
        }
      },
      '12': {
        start: {
          line: 24,
          column: 0
        },
        end: {
          line: 24,
          column: 86
        }
      },
      '13': {
        start: {
          line: 27,
          column: 0
        },
        end: {
          line: 27,
          column: 76
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
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0
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

var _ReactionController = require('../../controllers/ReactionController');

var _ReactionController2 = _interopRequireDefault(_ReactionController);

var _paginationController = require('../../controllers/paginationController');

var _paginationController2 = _interopRequireDefault(_paginationController);

var _validators = require('../../middlewares/validators');

var _validators2 = _interopRequireDefault(_validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (cov_nlr24yd6g.s[0]++, _ArticleController2.default),
    allArticles = _ref.allArticles,
    userArticles = _ref.userArticles,
    userDrafts = _ref.userDrafts,
    getAnArticle = _ref.getAnArticle,
    postArticle = _ref.postArticle,
    publishArticle = _ref.publishArticle,
    updateArticle = _ref.updateArticle,
    deleteArticle = _ref.deleteArticle,
    updateTags = _ref.updateTags,
    rateArticles = _ref.rateArticles;

var router = (cov_nlr24yd6g.s[1]++, _express2.default.Router());

cov_nlr24yd6g.s[2]++;
router.get('/articles', allArticles);
cov_nlr24yd6g.s[3]++;
router.get('/users/articles', _validators2.default.token, userArticles);
cov_nlr24yd6g.s[4]++;
router.get('/articles/drafts', _validators2.default.token, userDrafts);
cov_nlr24yd6g.s[5]++;
router.get('/articles/:slug', getAnArticle);
cov_nlr24yd6g.s[6]++;
router.post('/articles', _validators2.default.token, _validators2.default.postArticle, _validators2.default.tags, postArticle);
cov_nlr24yd6g.s[7]++;
router.put('/articles/:slug/publish', _validators2.default.token, publishArticle);
cov_nlr24yd6g.s[8]++;
router.put('/articles/:slug', _validators2.default.token, updateArticle);
cov_nlr24yd6g.s[9]++;
router.delete('/articles/:slug', _validators2.default.token, deleteArticle);
cov_nlr24yd6g.s[10]++;
router.get('/articles/page/:source', _paginationController2.default.page);
cov_nlr24yd6g.s[11]++;
router.put('/articles/:slug/tags', _validators2.default.token, _validators2.default.tags, updateTags);
cov_nlr24yd6g.s[12]++;
router.put('/articles/:slug/likes', _validators2.default.token, _ReactionController2.default.likeArticle);

// Articles rating endpoints ---------------------
cov_nlr24yd6g.s[13]++;
router.post('/articles/ratings/:articleId', _validators2.default.token, rateArticles);

exports.default = router;
module.exports = exports.default;