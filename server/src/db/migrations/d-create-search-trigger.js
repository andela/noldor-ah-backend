/* eslint-disable max-len */
const tableName = 'Articles';
const columnName = 'searchVectors';

export default {
  up: (queryInterface) => {
    const { sequelize } = queryInterface;
    const searchFields = ['title', 'content'];

    return sequelize
      .query(`ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" TSVECTOR`)
      .then(() => sequelize
        .query(`UPDATE "${tableName}" SET "${columnName}" = to_tsvector('english', title || ' ' || content )`)
        .then(() => sequelize
          .query(`CREATE TRIGGER updateSearchIndex BEFORE INSERT OR UPDATE ON "${tableName}" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${columnName}", 'pg_catalog.english', ${searchFields.join(', ')})`)));
  },

  down: (queryInterface) => {
    const { sequelize } = queryInterface;

    return sequelize
      .query(`DROP TRIGGER updateSearchIndex ON "${tableName}"`)
      .then(() => sequelize
        .query(`ALTER TABLE "${tableName}" DROP COLUMN "${columnName}"`));
  },
};
