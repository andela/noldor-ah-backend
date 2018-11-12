'use strict';

var cov_2jfs7lx2bg = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/b-create-article.js',
      hash = 'ecab7c0a646f95a416ef941466f9b592759a01ef',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/b-create-article.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 37
        },
        end: {
          line: 65,
          column: 4
        }
      },
      '1': {
        start: {
          line: 66,
          column: 26
        },
        end: {
          line: 66,
          column: 62
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
            line: 65,
            column: 4
          }
        },
        line: 2
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 66,
            column: 8
          },
          end: {
            line: 66,
            column: 9
          }
        },
        loc: {
          start: {
            line: 66,
            column: 26
          },
          end: {
            line: 66,
            column: 62
          }
        },
        line: 66
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
    cov_2jfs7lx2bg.f[0]++;
    cov_2jfs7lx2bg.s[0]++;
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
      title: {
        allowNull: false,
        required: true,
        unique: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        required: true,
        type: Sequelize.STRING
      },
      content: {
        required: true,
        allowNull: false,
        unique: false,
        type: Sequelize.TEXT
      },
      slug: {
        required: true,
        allowNull: false,
        type: Sequelize.TEXT
      },
      featuredImg: {
        required: false,
        allowNull: true,
        unique: false,
        type: Sequelize.TEXT
      },
      published: {
        required: false,
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      ratings: {
        required: false,
        allowNull: true,
        type: Sequelize.INTEGER
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
    cov_2jfs7lx2bg.f[1]++;
    cov_2jfs7lx2bg.s[1]++;
    return queryInterface.dropTable('Articles');
  }
};
module.exports = exports.default;