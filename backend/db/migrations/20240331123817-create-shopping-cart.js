'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShoppingCarts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resturantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Resturants',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      offerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Offers',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      dealId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Deals',
          key: 'id',
      },
      onDelete: 'cascade'
      },
      tip: {
        type: Sequelize.INTEGER
      },
      fees: {
        type: Sequelize.INTEGER
      },
      gift: {
        type: Sequelize.BOOLEAN
      },
      pickup: {
        type: Sequelize.BOOLEAN
      },
      group: {
        type: Sequelize.BOOLEAN
      },
      price: {
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
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "ShoppingCarts";
    return queryInterface.dropTable(options);
  }
};
