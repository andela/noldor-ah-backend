'use strict';

var cov_2l6cjct7su = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/multifile.js',
      hash = '8b40a73b8b54ff0a971020c196c06f64d6ff8c66',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/multifile.js',
    statementMap: {
      '0': {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 11,
          column: 16
        }
      },
      '1': {
        start: {
          line: 13,
          column: 0
        },
        end: {
          line: 15,
          column: 3
        }
      },
      '2': {
        start: {
          line: 17,
          column: 16
        },
        end: {
          line: 22,
          column: 2
        }
      },
      '3': {
        start: {
          line: 24,
          column: 15
        },
        end: {
          line: 24,
          column: 34
        }
      },
      '4': {
        start: {
          line: 26,
          column: 18
        },
        end: {
          line: 26,
          column: 41
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
      '4': 0
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
}(); /**
      * Resources: https://medium.freecodecamp.org/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9
      * https://www.npmjs.com/package/multer-storage-cloudinary
      * https://cloudinary.com/documentation/solution_overview
      */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _multerStorageCloudinary = require('multer-storage-cloudinary');

var _multerStorageCloudinary2 = _interopRequireDefault(_multerStorageCloudinary);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_2l6cjct7su.s[0]++;


_dotenv2.default.config();

cov_2l6cjct7su.s[1]++;
_cloudinary2.default.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

var storage = (cov_2l6cjct7su.s[2]++, (0, _multerStorageCloudinary2.default)({
  cloudinary: _cloudinary2.default,
  folder: 'Author\'s Haven',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  transformation: [{ width: 300, height: 300, crop: 'thumb' }]
}));

var upload = (cov_2l6cjct7su.s[3]++, (0, _multer2.default)({ storage: storage }));

var multifile = (cov_2l6cjct7su.s[4]++, upload.single('avatar'));

exports.default = multifile;
module.exports = exports.default;