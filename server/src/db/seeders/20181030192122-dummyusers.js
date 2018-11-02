export default{
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:

    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'Valentine',
        email: 'molestie.orci.tincidunt@asollicitudin.org',
        password: 'USV85PJQ5TR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        username: 'Kato',
        email: 'et@cursuspurus.com',
        password: 'SFC73OEL2HU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        username: 'Akeem',
        email: 'sed.facilisis.vitae@est.edu',
        password: 'MUP93TWT3WO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        username: 'Jeremy',
        email: 'Aliquam.adipiscing@dui.net',
        password: 'UCW64MBC7ZT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        username: 'Aubrey',
        email: 'lorem.ac.risus@non.com',
        password: 'CRR49AEN1DE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        username: 'Oprah',
        email: 'fringilla.purus@nequenonquam.co.uk',
        password: 'QAE41CIE0QM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
