'use strict';

var cov_2l16rulyew = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/User.js',
      hash = 'a0aa65ea1858c54be53f2c72361cd80fdecf138e',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/User.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 14
        },
        end: {
          line: 73,
          column: 1
        }
      },
      '1': {
        start: {
          line: 2,
          column: 15
        },
        end: {
          line: 62,
          column: 24
        }
      },
      '2': {
        start: {
          line: 63,
          column: 2
        },
        end: {
          line: 71,
          column: 4
        }
      },
      '3': {
        start: {
          line: 64,
          column: 4
        },
        end: {
          line: 70,
          column: 7
        }
      },
      '4': {
        start: {
          line: 72,
          column: 2
        },
        end: {
          line: 72,
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
            line: 73,
            column: 1
          }
        },
        line: 1
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 63,
            column: 19
          },
          end: {
            line: 63,
            column: 20
          }
        },
        loc: {
          start: {
            line: 63,
            column: 31
          },
          end: {
            line: 71,
            column: 3
          }
        },
        line: 63
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
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
cov_2l16rulyew.s[0]++;
var Users = function Users(sequelize, DataTypes) {
  cov_2l16rulyew.f[0]++;

  var User = (cov_2l16rulyew.s[1]++, sequelize.define('User', {
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
    forgotPasswordHash: {
      required: false,
      allowNull: true,
      unique: true,
      type: DataTypes.STRING
    },
    avatarUrl: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    }
  }, { paranoid: true }));
  cov_2l16rulyew.s[2]++;
  User.associate = function (models) {
    cov_2l16rulyew.f[1]++;
    cov_2l16rulyew.s[3]++;

    User.belongsToMany(models.Article, {
      through: 'userReactions',
      as: 'articles',
      foreignKey: 'userId'
    }, {
      onDelete: 'CASCADE'
    });
  };
  cov_2l16rulyew.s[4]++;
  return User;
};

exports.default = Users;
module.exports = exports.default;