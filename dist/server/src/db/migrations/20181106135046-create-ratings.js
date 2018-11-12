'use strict';

var cov_2fjuwmu6oe = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/20181106135046-create-ratings.js',
      hash = 'fdfb8b9a7eea55dd5e0a0ab3c1b822f1f4e21311',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/20181106135046-create-ratings.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 37
        },
        end: {
          line: 34,
          column: 4
        }
      },
      '1': {
        start: {
          line: 35,
          column: 26
        },
        end: {
          line: 35,
          column: 61
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
            line: 34,
            column: 4
          }
        },
        line: 2
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 35,
            column: 8
          },
          end: {
            line: 35,
            column: 9
          }
        },
        loc: {
          start: {
            line: 35,
            column: 26
          },
          end: {
            line: 35,
            column: 61
          }
        },
        line: 35
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
    cov_2fjuwmu6oe.f[0]++;
    cov_2fjuwmu6oe.s[0]++;
    return queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        required: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      articleId: {
        required: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      ratings: {
        allowNull: false,
        required: true,
        unique: false,
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.INTEGER
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
    cov_2fjuwmu6oe.f[1]++;
    cov_2fjuwmu6oe.s[1]++;
    return queryInterface.dropTable('Ratings');
  }
};
module.exports = exports.default;