import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => {

      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Articles', [
        {
          id: 1,
          userId: 3,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          userId: 5,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          userId: 4,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          userId: 5,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          userId: 3,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          userId: 4,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          userId: 3,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          userId: 1,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          userId: 3,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          userId: 1,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 11,
          userId: 5,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 12,
          userId: 4,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 13,
          userId: 3,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 14,
          userId: 1,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 15,
          userId: 3,
          title: 'Gummies sweet fruitcake topping',
          content: 'Apple pie oat cake wafer tiramisu sugar plum sweet croissant macaroon. Carrot cake croissant cookie sesame snaps cake pastry jelly chocolate bar. Dragée biscuit jelly-o. Sweet roll sesame snaps cake dragée powder gummi bears candy canes toffee jujubes. Tart apple pie cheesecake cookie. Topping liquorice bear claw cupcake tiramisu fruitcake gummi bears jelly sugar plum. Chocolate jelly-o tootsie roll cupcake oat cake. Carrot cake jelly icing sesame snaps tart. Wafer jelly-o macaroon. Pastry icing biscuit gummi bears cake bear claw sugar plum soufflé. Jelly dragée icing. Tiramisu brownie fruitcake pie pastry chupa chups icing icing jelly. Jujubes sesame snaps jelly-o gummies macaroon. Brownie cake candy chocolate pudding jelly beans bonbon.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
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
