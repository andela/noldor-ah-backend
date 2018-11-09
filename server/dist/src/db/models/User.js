'use strict';

var cov_6qhv6fu26 = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/models/User.js',
      hash = '0668a7c64b508f691b5551e5a8f3b8ffd73f00b0',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/models/User.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 14
        },
        end: {
          line: 61,
          column: 1
        }
      },
      '1': {
        start: {
          line: 2,
          column: 15
        },
        end: {
          line: 56,
          column: 8
        }
      },
      '2': {
        start: {
          line: 57,
          column: 2
        },
        end: {
          line: 59,
          column: 4
        }
      },
      '3': {
        start: {
          line: 60,
          column: 2
        },
        end: {
          line: 60,
          column: 14
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 1,
            column: 14
          },
          end: {
            line: 1,
            column: 15
          }
        },
        loc: {
          start: {
            line: 1,
            column: 40
          },
          end: {
            line: 61,
            column: 1
          }
        },
        line: 1
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 57,
            column: 19
          },
          end: {
            line: 57,
            column: 20
          }
        },
        loc: {
          start: {
            line: 57,
            column: 25
          },
          end: {
            line: 59,
            column: 3
          }
        },
        line: 57
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
      '0': 0,
      '1': 0
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
cov_6qhv6fu26.s[0]++;
var Users = function Users(sequelize, DataTypes) {
  cov_6qhv6fu26.f[0]++;

  var User = (cov_6qhv6fu26.s[1]++, sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
    lastName: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
    username: {
      required: true,
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      required: true,
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.STRING
    },
    bio: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.TEXT
    },
    confirmEmail: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avatarUrl: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    }
  }, {}));
  cov_6qhv6fu26.s[2]++;
  User.associate = function () {
    cov_6qhv6fu26.f[1]++;
  };
  cov_6qhv6fu26.s[3]++;
  return User;
};

exports.default = Users;
module.exports = exports.default;