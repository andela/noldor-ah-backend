'use strict';

var cov_1hq525dbb9 = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/ratings.js',
      hash = 'd7a7df31b2f35cec3345d380f2d5d75502a0faf8',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/ratings.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 18
        },
        end: {
          line: 25,
          column: 8
        }
      },
      '1': {
        start: {
          line: 26,
          column: 2
        },
        end: {
          line: 34,
          column: 4
        }
      },
      '2': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 29,
          column: 7
        }
      },
      '3': {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 33,
          column: 7
        }
      },
      '4': {
        start: {
          line: 35,
          column: 2
        },
        end: {
          line: 35,
          column: 17
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 16
          }
        },
        loc: {
          start: {
            line: 1,
            column: 41
          },
          end: {
            line: 36,
            column: 1
          }
        },
        line: 1
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 26,
            column: 22
          },
          end: {
            line: 26,
            column: 23
          }
        },
        loc: {
          start: {
            line: 26,
            column: 34
          },
          end: {
            line: 34,
            column: 3
          }
        },
        line: 26
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

exports.default = function (sequelize, DataTypes) {
  cov_1hq525dbb9.f[0]++;

  var Ratings = (cov_1hq525dbb9.s[0]++, sequelize.define('Ratings', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    articleId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    ratings: {
      allowNull: false,
      required: true,
      unique: false,
      type: DataTypes.INTEGER
    }
  }, {}));
  cov_1hq525dbb9.s[1]++;
  Ratings.associate = function (models) {
    cov_1hq525dbb9.f[1]++;
    cov_1hq525dbb9.s[2]++;

    Ratings.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    cov_1hq525dbb9.s[3]++;
    Ratings.belongsTo(models.Article, {
      foreignKey: 'articleId'
    });
  };
  cov_1hq525dbb9.s[4]++;
  return Ratings;
};

module.exports = exports.default;