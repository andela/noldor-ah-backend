'use strict';

var cov_1rfme2qdmw = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/Tag.js',
      hash = '18f91e2e6bc8d44e7f049146e6d80af2a2437a9b',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/Tag.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 15
        },
        end: {
          line: 7,
          column: 8
        }
      },
      '1': {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 15,
          column: 4
        }
      },
      '2': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 14,
          column: 7
        }
      },
      '3': {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 16,
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
            line: 17,
            column: 1
          }
        },
        line: 1
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 8,
            column: 19
          },
          end: {
            line: 8,
            column: 20
          }
        },
        loc: {
          start: {
            line: 8,
            column: 31
          },
          end: {
            line: 15,
            column: 3
          }
        },
        line: 8
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

exports.default = function (sequelize, DataTypes) {
  cov_1rfme2qdmw.f[0]++;

  var Tags = (cov_1rfme2qdmw.s[0]++, sequelize.define('Tags', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {}));
  cov_1rfme2qdmw.s[1]++;
  Tags.associate = function (models) {
    cov_1rfme2qdmw.f[1]++;
    cov_1rfme2qdmw.s[2]++;

    Tags.belongsToMany(models.Article, {
      through: 'ArticleTags',
      as: 'articles',
      foreignKey: 'tagId',
      onDelete: 'CASCADE'
    });
  };
  cov_1rfme2qdmw.s[3]++;
  return Tags;
};

module.exports = exports.default;