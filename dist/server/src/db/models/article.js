'use strict';

var cov_t5zb9oavl = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/article.js',
      hash = '6c1ba266214685c4d3d896f8a51a77468f9203e7',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/models/article.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 18
        },
        end: {
          line: 57,
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
          line: 58,
          column: 2
        },
        end: {
          line: 73,
          column: 4
        }
      },
      '5': {
        start: {
          line: 59,
          column: 4
        },
        end: {
          line: 59,
          column: 61
        }
      },
      '6': {
        start: {
          line: 61,
          column: 4
        },
        end: {
          line: 66,
          column: 7
        }
      },
      '7': {
        start: {
          line: 68,
          column: 4
        },
        end: {
          line: 72,
          column: 7
        }
      },
      '8': {
        start: {
          line: 74,
          column: 2
        },
        end: {
          line: 74,
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
            line: 75,
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
            line: 58,
            column: 22
          },
          end: {
            line: 58,
            column: 23
          }
        },
        loc: {
          start: {
            line: 58,
            column: 34
          },
          end: {
            line: 73,
            column: 3
          }
        },
        line: 58
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
      '6': 0,
      '7': 0,
      '8': 0
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
  cov_t5zb9oavl.f[0]++;

  var Article = (cov_t5zb9oavl.s[0]++, sequelize.define('Article', {
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
        cov_t5zb9oavl.f[1]++;

        var articleId = (cov_t5zb9oavl.s[1]++, this.id.split('-').pop());
        var value = (cov_t5zb9oavl.s[2]++, val + '-' + articleId);
        cov_t5zb9oavl.s[3]++;
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
    },
    ratings: {
      required: false,
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {}));
  cov_t5zb9oavl.s[4]++;
  Article.associate = function (models) {
    cov_t5zb9oavl.f[2]++;
    cov_t5zb9oavl.s[5]++;

    Article.belongsTo(models.User, { foreignKey: 'userId' });

    cov_t5zb9oavl.s[6]++;
    Article.belongsToMany(models.Tags, {
      through: 'ArticleTags',
      as: 'tags',
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

    cov_t5zb9oavl.s[7]++;
    Article.belongsToMany(models.User, {
      through: 'userReactions',
      as: 'users',
      foreignKey: 'articleId'
    });
  };
  cov_t5zb9oavl.s[8]++;
  return Article;
};

module.exports = exports.default;