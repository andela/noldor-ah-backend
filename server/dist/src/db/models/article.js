'use strict';

var cov_2ltvuqr2e8 = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/models/article.js',
      hash = '6bf8660df549c868fb1579141aae0c89cae5ba44',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/models/article.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 18
        },
        end: {
          line: 52,
          column: 8
        }
      },
      '1': {
        start: {
          line: 36,
          column: 26
        },
        end: {
          line: 36,
          column: 50
        }
      },
      '2': {
        start: {
          line: 37,
          column: 22
        },
        end: {
          line: 37,
          column: 43
        }
      },
      '3': {
        start: {
          line: 38,
          column: 8
        },
        end: {
          line: 38,
          column: 41
        }
      },
      '4': {
        start: {
          line: 53,
          column: 2
        },
        end: {
          line: 55,
          column: 4
        }
      },
      '5': {
        start: {
          line: 54,
          column: 4
        },
        end: {
          line: 54,
          column: 61
        }
      },
      '6': {
        start: {
          line: 56,
          column: 2
        },
        end: {
          line: 56,
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
            line: 57,
            column: 1
          }
        },
        line: 1
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 35,
            column: 6
          },
          end: {
            line: 35,
            column: 7
          }
        },
        loc: {
          start: {
            line: 35,
            column: 15
          },
          end: {
            line: 39,
            column: 7
          }
        },
        line: 35
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 53,
            column: 22
          },
          end: {
            line: 53,
            column: 23
          }
        },
        loc: {
          start: {
            line: 53,
            column: 34
          },
          end: {
            line: 55,
            column: 3
          }
        },
        line: 53
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0
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
  cov_2ltvuqr2e8.f[0]++;

  var Article = (cov_2ltvuqr2e8.s[0]++, sequelize.define('Article', {
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
    title: {
      allowNull: false,
      required: true,
      unique: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING
    },
    content: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
    slug: {
      required: true,
      allowNull: false,
      type: DataTypes.TEXT,
      set: function set(val) {
        cov_2ltvuqr2e8.f[1]++;

        var articleId = (cov_2ltvuqr2e8.s[1]++, this.id.split('-').pop());
        var value = (cov_2ltvuqr2e8.s[2]++, val + '-' + articleId);
        cov_2ltvuqr2e8.s[3]++;
        this.setDataValue('slug', value);
      }
    },
    featuredImg: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.TEXT
    },
    published: {
      required: false,
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {}));
  cov_2ltvuqr2e8.s[4]++;
  Article.associate = function (models) {
    cov_2ltvuqr2e8.f[2]++;
    cov_2ltvuqr2e8.s[5]++;

    Article.belongsTo(models.User, { foreignKey: 'userId' });
  };
  cov_2ltvuqr2e8.s[6]++;
  return Article;
};

module.exports = exports.default;