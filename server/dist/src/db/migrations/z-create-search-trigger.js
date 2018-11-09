'use strict';

var cov_2pcc421phr = function () {
  var path = '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/migrations/z-create-search-trigger.js',
      hash = '2153ace5503e37c22099abd90fb4df940b624c5e',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/chukwuemekaajima/noldor-ah-backend/server/src/db/migrations/z-create-search-trigger.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 18
        },
        end: {
          line: 1,
          column: 28
        }
      },
      '1': {
        start: {
          line: 2,
          column: 19
        },
        end: {
          line: 2,
          column: 34
        }
      },
      '2': {
        start: {
          line: 6,
          column: 26
        },
        end: {
          line: 6,
          column: 40
        }
      },
      '3': {
        start: {
          line: 7,
          column: 25
        },
        end: {
          line: 7,
          column: 45
        }
      },
      '4': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 16,
          column: 222
        }
      },
      '5': {
        start: {
          line: 11,
          column: 18
        },
        end: {
          line: 16,
          column: 220
        }
      },
      '6': {
        start: {
          line: 13,
          column: 20
        },
        end: {
          line: 16,
          column: 219
        }
      },
      '7': {
        start: {
          line: 15,
          column: 22
        },
        end: {
          line: 16,
          column: 218
        }
      },
      '8': {
        start: {
          line: 20,
          column: 26
        },
        end: {
          line: 20,
          column: 40
        }
      },
      '9': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 27,
          column: 74
        }
      },
      '10': {
        start: {
          line: 24,
          column: 18
        },
        end: {
          line: 25,
          column: 40
        }
      },
      '11': {
        start: {
          line: 26,
          column: 18
        },
        end: {
          line: 27,
          column: 72
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 5,
            column: 6
          },
          end: {
            line: 5,
            column: 7
          }
        },
        loc: {
          start: {
            line: 5,
            column: 26
          },
          end: {
            line: 17,
            column: 3
          }
        },
        line: 5
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 11,
            column: 12
          },
          end: {
            line: 11,
            column: 13
          }
        },
        loc: {
          start: {
            line: 11,
            column: 18
          },
          end: {
            line: 16,
            column: 220
          }
        },
        line: 11
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 13,
            column: 14
          },
          end: {
            line: 13,
            column: 15
          }
        },
        loc: {
          start: {
            line: 13,
            column: 20
          },
          end: {
            line: 16,
            column: 219
          }
        },
        line: 13
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 15,
            column: 16
          },
          end: {
            line: 15,
            column: 17
          }
        },
        loc: {
          start: {
            line: 15,
            column: 22
          },
          end: {
            line: 16,
            column: 218
          }
        },
        line: 15
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 19,
            column: 8
          },
          end: {
            line: 19,
            column: 9
          }
        },
        loc: {
          start: {
            line: 19,
            column: 28
          },
          end: {
            line: 28,
            column: 3
          }
        },
        line: 19
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 24,
            column: 12
          },
          end: {
            line: 24,
            column: 13
          }
        },
        loc: {
          start: {
            line: 24,
            column: 18
          },
          end: {
            line: 25,
            column: 40
          }
        },
        line: 24
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 26,
            column: 12
          },
          end: {
            line: 26,
            column: 13
          }
        },
        loc: {
          start: {
            line: 26,
            column: 18
          },
          end: {
            line: 27,
            column: 72
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
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0
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
var tableName = (cov_2pcc421phr.s[0]++, 'Articles');
var columnName = (cov_2pcc421phr.s[1]++, 'searchVectors');

exports.default = {
  up: function up(queryInterface) {
    cov_2pcc421phr.f[0]++;

    var _ref = (cov_2pcc421phr.s[2]++, queryInterface),
        sequelize = _ref.sequelize;

    var searchFields = (cov_2pcc421phr.s[3]++, ['title', 'content']);

    cov_2pcc421phr.s[4]++;
    return sequelize.query('ALTER TABLE "' + tableName + '" ADD COLUMN "' + columnName + '" TSVECTOR').then(function () {
      cov_2pcc421phr.f[1]++;
      cov_2pcc421phr.s[5]++;
      return sequelize.query('UPDATE "' + tableName + '" SET "' + columnName + '" = to_tsvector(\'english\', title || \' \' || content )').then(function () {
        cov_2pcc421phr.f[2]++;
        cov_2pcc421phr.s[6]++;
        return sequelize.query('CREATE INDEX searchIndex ON "' + tableName + '" ("' + columnName + '");').then(function () {
          cov_2pcc421phr.f[3]++;
          cov_2pcc421phr.s[7]++;
          return sequelize.query('CREATE TRIGGER updateSearchIndex BEFORE INSERT OR UPDATE ON "' + tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("' + columnName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')');
        });
      });
    });
  },

  down: function down(queryInterface) {
    cov_2pcc421phr.f[4]++;

    var _ref2 = (cov_2pcc421phr.s[8]++, queryInterface),
        sequelize = _ref2.sequelize;

    cov_2pcc421phr.s[9]++;


    return sequelize.query('DROP TRIGGER updateSearchIndex ON "' + tableName + '"').then(function () {
      cov_2pcc421phr.f[5]++;
      cov_2pcc421phr.s[10]++;
      return sequelize.query('DROP INDEX searchIndex');
    }).then(function () {
      cov_2pcc421phr.f[6]++;
      cov_2pcc421phr.s[11]++;
      return sequelize.query('ALTER TABLE "' + tableName + '" DROP COLUMN "' + columnName + '"');
    });
  }
};
module.exports = exports.default;