export default {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      name: 'self-development',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'travel',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'health',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'finance',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'relationships',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'science',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'technology',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'life',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: queryInterface => queryInterface.bulkDelete('Categories', null, {}),
};
