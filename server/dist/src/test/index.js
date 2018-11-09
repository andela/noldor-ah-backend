'use strict';

var cov_9r0bpp5ky = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/test/index.js',
      hash = '969c137079c80c505133785268cac9bbce4770dc',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/test/index.js',
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

var _userTest = require('./userTest');

var _userTest2 = _interopRequireDefault(_userTest);

var _articleTest = require('./articleTest');

var _articleTest2 = _interopRequireDefault(_articleTest);

var _searchTest = require('./searchTest');

var _searchTest2 = _interopRequireDefault(_searchTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  userTest: _userTest2.default,
  articleTest: _articleTest2.default,
  searchTest: _searchTest2.default
};
module.exports = exports.default;