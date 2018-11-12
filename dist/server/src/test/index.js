'use strict';

var cov_2omxlakf5z = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/test/index.js',
      hash = '24edfc4b384949ee52d1bba13c5309f93e818668',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/test/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
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

var _userTest = require('./integration tests/userTest');

var _userTest2 = _interopRequireDefault(_userTest);

var _articleTest = require('./integration tests/articleTest');

var _articleTest2 = _interopRequireDefault(_articleTest);

var _searchTest = require('./integration tests/searchTest');

var _searchTest2 = _interopRequireDefault(_searchTest);

var _tagsTest = require('./integration tests/tagsTest');

var _tagsTest2 = _interopRequireDefault(_tagsTest);

var _paginationTest = require('./integration tests/paginationTest');

var _paginationTest2 = _interopRequireDefault(_paginationTest);

var _reactionTest = require('./integration tests/reactionTest');

var _reactionTest2 = _interopRequireDefault(_reactionTest);

var _ratingTest = require('./integration tests/ratingTest');

var _ratingTest2 = _interopRequireDefault(_ratingTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  userTest: _userTest2.default,
  articleTest: _articleTest2.default,
  searchTest: _searchTest2.default,
  tagsTest: _tagsTest2.default,
  paginationTest: _paginationTest2.default,
  reactionTest: _reactionTest2.default,
  ratingTest: _ratingTest2.default
};
module.exports = exports.default;