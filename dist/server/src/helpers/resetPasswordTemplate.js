"use strict";

var cov_1h4uyz4xkz = function () {
    var path = "/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/resetPasswordTemplate.js",
        hash = "0bd54466a3bdb62c9d948511001d8c3f01624f06",
        Function = function () {}.constructor,
        global = new Function('return this')(),
        gcv = "__coverage__",
        coverageData = {
        path: "/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/helpers/resetPasswordTemplate.js",
        statementMap: {
            "0": {
                start: {
                    line: 1,
                    column: 30
                },
                end: {
                    line: 15,
                    column: 1
                }
            },
            "1": {
                start: {
                    line: 2,
                    column: 15
                },
                end: {
                    line: 13,
                    column: 9
                }
            },
            "2": {
                start: {
                    line: 14,
                    column: 2
                },
                end: {
                    line: 14,
                    column: 14
                }
            }
        },
        fnMap: {
            "0": {
                name: "(anonymous_0)",
                decl: {
                    start: {
                        line: 1,
                        column: 30
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 50
                    },
                    end: {
                        line: 15,
                        column: 1
                    }
                },
                line: 1
            }
        },
        branchMap: {},
        s: {
            "0": 0,
            "1": 0,
            "2": 0
        },
        f: {
            "0": 0
        },
        b: {},
        _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184"
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
cov_1h4uyz4xkz.s[0]++;
var resetPasswordTemplate = function resetPasswordTemplate(baseUrl, token) {
    cov_1h4uyz4xkz.f[0]++;

    var html = (cov_1h4uyz4xkz.s[1]++, "\n        <div style=\"background:#fff; margin:0 auto; padding:10px; text-align:center;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2); width:70%; font-sixe:14px;\"> \n            <p style=\"margin-bottom:25px\";>You told us you forgot your password. If you really did, click <a href= " + baseUrl + "/" + token + "> here</a> to get a new one</p>\n\n            <div style=\"border-top:25px; border-bottom:25px;\">\n                <p> <a style=\"background:#E66869; color:white;text-decoration:none;text-align:center;padding:10px;\"; href=\"http://" + baseUrl + "/api/v1/users/forgot/" + token + "\">Choose a new password</a> </p>\n            </div>\n\n            <p style=\"margin-top:25px;\">If you didn't mean to change your password, you can just ignore this email; </br>\n            Your password will not be changed.</p>\n        </div>\n        ");
    cov_1h4uyz4xkz.s[2]++;
    return html;
};

exports.default = resetPasswordTemplate;
module.exports = exports.default;