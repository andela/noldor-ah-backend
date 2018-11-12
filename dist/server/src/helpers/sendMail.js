'use strict';

var cov_23tl0jk96b = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/sendMail.js',
      hash = 'b51a429af7332dfcc2e5e96ee82e17cdb1543c11',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/sendMail.js',
    statementMap: {
      '0': {
        start: {
          line: 3,
          column: 18
        },
        end: {
          line: 14,
          column: 1
        }
      },
      '1': {
        start: {
          line: 6,
          column: 2
        },
        end: {
          line: 6,
          column: 49
        }
      },
      '2': {
        start: {
          line: 7,
          column: 18
        },
        end: {
          line: 12,
          column: 3
        }
      },
      '3': {
        start: {
          line: 13,
          column: 2
        },
        end: {
          line: 13,
          column: 23
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 3,
            column: 18
          },
          end: {
            line: 3,
            column: 19
          }
        },
        loc: {
          start: {
            line: 3,
            column: 63
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 3
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    f: {
      '0': 0
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

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_23tl0jk96b.s[0]++;


var sendEmail = function sendEmail(receiver, sender, subject, htmlTemplate) {
  cov_23tl0jk96b.f[0]++;
  cov_23tl0jk96b.s[1]++;

  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  _mail2.default.setApiKey(process.env.SENDGRID_API_KEY);
  var message = (cov_23tl0jk96b.s[2]++, {
    to: receiver,
    from: sender,
    subject: subject,
    html: htmlTemplate
  });
  cov_23tl0jk96b.s[3]++;
  _mail2.default.send(message);
};

exports.default = sendEmail;
module.exports = exports.default;