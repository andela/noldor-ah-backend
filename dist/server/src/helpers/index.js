'use strict';

var cov_m3npwnggx = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/index.js',
      hash = '37372f6296f5f8bf5b7157beca677b58949377c3',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/index.js',
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

var _TagWorker = require('../workers/TagWorker');

var _TagWorker2 = _interopRequireDefault(_TagWorker);

var _issueToken = require('./issueToken');

var _issueToken2 = _interopRequireDefault(_issueToken);

var _multifile = require('./multifile');

var _multifile2 = _interopRequireDefault(_multifile);

var _resetPasswordTemplate = require('./resetPasswordTemplate');

var _resetPasswordTemplate2 = _interopRequireDefault(_resetPasswordTemplate);

var _sendMail = require('./sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

var _slugDecoder = require('./slugDecoder');

var _slugDecoder2 = _interopRequireDefault(_slugDecoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  addTags: _TagWorker2.default,
  issueToken: _issueToken2.default,
  multifile: _multifile2.default,
  resetPasswordTemplate: _resetPasswordTemplate2.default,
  sendMail: _sendMail2.default,
  slugDecoder: _slugDecoder2.default
};
module.exports = exports.default;