'use strict';

var cov_2hebvki3jy = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/c-create-user-reaction.js',
      hash = 'dedaf0e33b8960bd0a312b7b8db8e4f54315e583',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/c-create-user-reaction.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 37
        },
        end: {
          line: 37,
          column: 4
        }
      },
      '1': {
        start: {
          line: 38,
          column: 26
        },
        end: {
          line: 38,
          column: 67
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
            line: 37,
            column: 4
          }
        },
        line: 2
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 38,
            column: 8
          },
          end: {
            line: 38,
            column: 9
          }
        },
        loc: {
          start: {
            line: 38,
            column: 26
          },
          end: {
            line: 38,
            column: 67
          }
        },
        line: 38
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
    cov_2hebvki3jy.f[0]++;
    cov_2hebvki3jy.s[0]++;
    return queryInterface.createTable('userReactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      userId: {
        required: true,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      articleId: {
        required: true,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Articles',
          key: 'id',
          as: 'articleId'
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
    cov_2hebvki3jy.f[1]++;
    cov_2hebvki3jy.s[1]++;
    return queryInterface.dropTable('userReactions');
  }
};
module.exports = exports.default;