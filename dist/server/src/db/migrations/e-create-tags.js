'use strict';

var cov_29vpbknwhl = function () {
  var path = '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/e-create-tags.js',
      hash = '38383d565b1f74fe34b19b98f0be6c2466619fec',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ovieokeh/Desktop/noldor-ah-backend/server/src/db/migrations/e-create-tags.js',
    statementMap: {
      '0': {
        start: {
          line: 2,
          column: 37
        },
        end: {
          line: 21,
          column: 4
        }
      },
      '1': {
        start: {
          line: 22,
          column: 26
        },
        end: {
          line: 22,
          column: 58
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
            line: 21,
            column: 4
          }
        },
        line: 2
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 22,
            column: 8
          },
          end: {
            line: 22,
            column: 9
          }
        },
        loc: {
          start: {
            line: 22,
            column: 26
          },
          end: {
            line: 22,
            column: 58
          }
        },
        line: 22
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
    cov_29vpbknwhl.f[0]++;
    cov_29vpbknwhl.s[0]++;
    return queryInterface.createTable('Tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
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
    cov_29vpbknwhl.f[1]++;
    cov_29vpbknwhl.s[1]++;
    return queryInterface.dropTable('Tags');
  }
};
module.exports = exports.default;