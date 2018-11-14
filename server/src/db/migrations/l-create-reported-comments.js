
export default {
  up: (queryInterface) => {
    const query = 'DELETE FROM pg_enum '
      + 'WHERE enumlabel = \'blocked\' ';
    queryInterface.sequelize.query(query);
    const q2 = "ALTER TYPE \"enum_ReportedComments_status\" ADD VALUE 'blocked'";
    queryInterface.sequelize.query(q2);
  },

  down: (queryInterface) => {
    const query = 'DELETE FROM pg_enum '
      + 'WHERE enumlabel = \'blocked\' ';
    return queryInterface.sequelize.query(query);
  }
};
