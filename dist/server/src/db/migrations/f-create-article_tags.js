'use strict';

var cov_u8fbcyts0 = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/f-create-article_tags.js',
      hash = 'a52514f4465c8d8f0fca236edecd4601ba3a3646',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/f-create-article_tags.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 37
        },
        end: {
          line: 33,
          column: 4
        }
      },
      '1': {
        start: {
          line: 34,
          column: 26
        },
        end: {
          line: 34,
          column: 65
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 2,
            column: 6
          },
          end: {
            line: 2,
            column: 7
          }
        },
        loc: {
          start: {
            line: 2,
            column: 37
          },
          end: {
            line: 33,
            column: 4
          }
        },
        line: 2
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 34,
            column: 8
          },
          end: {
            line: 34,
            column: 9
          }
        },
        loc: {
          start: {
            line: 34,
            column: 26
          },
          end: {
            line: 34,
            column: 65
          }
        },
        line: 34
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0
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
exports.default = {
  up: function up(queryInterface, Sequelize) {
    cov_u8fbcyts0.f[0]++;
    cov_u8fbcyts0.s[0]++;
    return queryInterface.createTable('ArticleTags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      articleId: {
        required: true,
        type: Sequelize.Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Articles',
          key: 'id'
        }
      },
      tagId: {
        required: true,
        type: Sequelize.Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Tags',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface) {
    cov_u8fbcyts0.f[1]++;
    cov_u8fbcyts0.s[1]++;
    return queryInterface.dropTable('ArticleTags');
  }
};
module.exports = exports.default;