'use strict';

var cov_2euhogo5wq = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/a-create-user.js',
      hash = 'e53d22810245b59c3386a4ac7102a65bcb14c296',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/a-create-user.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 37
        },
        end: {
          line: 74,
          column: 24
        }
      },
      '1': {
        start: {
          line: 75,
          column: 26
        },
        end: {
          line: 75,
          column: 59
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
            line: 74,
            column: 24
          }
        },
        line: 2
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 75,
            column: 8
          },
          end: {
            line: 75,
            column: 9
          }
        },
        loc: {
          start: {
            line: 75,
            column: 26
          },
          end: {
            line: 75,
            column: 59
          }
        },
        line: 75
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
    cov_2euhogo5wq.f[0]++;
    cov_2euhogo5wq.s[0]++;
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        required: false,
        allowNull: true,
        unique: false,
        type: Sequelize.STRING
      },
      lastName: {
        required: false,
        allowNull: true,
        unique: false,
        type: Sequelize.STRING
      },
      username: {
        required: true,
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        required: true,
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        required: true,
        allowNull: false,
        unique: false,
        type: Sequelize.STRING
      },
      bio: {
        required: false,
        allowNull: true,
        unique: false,
        type: Sequelize.TEXT
      },
      confirmEmail: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      forgotPasswordHash: {
        required: false,
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      avatarUrl: {
        required: false,
        allowNull: true,
        unique: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, { paranoid: true });
  },
  down: function down(queryInterface) {
    cov_2euhogo5wq.f[1]++;
    cov_2euhogo5wq.s[1]++;
    return queryInterface.dropTable('Users');
  }
};
module.exports = exports.default;