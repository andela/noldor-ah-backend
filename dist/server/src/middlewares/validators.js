'use strict';

var cov_7tnbsw9is = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/validators.js',
      hash = 'a1a05d42bbf1a4e474ca98593a39590add47d21f',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/middlewares/validators.js',
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

var _postArticle = require('./articleValidations/postArticle');

var _postArticle2 = _interopRequireDefault(_postArticle);

var _search = require('./articleValidations/search');

var _search2 = _interopRequireDefault(_search);

var _tags = require('./articleValidations/tags');

var _tags2 = _interopRequireDefault(_tags);

var _createProfile = require('./userValidations/createProfile');

var _createProfile2 = _interopRequireDefault(_createProfile);

var _forgotPassword = require('./userValidations/forgotPassword');

var _forgotPassword2 = _interopRequireDefault(_forgotPassword);

var _login = require('./userValidations/login');

var _login2 = _interopRequireDefault(_login);

var _resetPassword = require('./userValidations/resetPassword');

var _resetPassword2 = _interopRequireDefault(_resetPassword);

var _signup = require('./userValidations/signup');

var _signup2 = _interopRequireDefault(_signup);

var _token = require('./userValidations/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  postArticle: _postArticle2.default,
  search: _search2.default,
  tags: _tags2.default,
  createProfile: _createProfile2.default,
  forgotPassword: _forgotPassword2.default,
  login: _login2.default,
  resetPassword: _resetPassword2.default,
  signup: _signup2.default,
  token: _token2.default
};
module.exports = exports.default;