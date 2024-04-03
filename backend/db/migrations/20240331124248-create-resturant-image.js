'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResturantImages', {
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
      bannerUrl: {
        type: Sequelize.TEXT
      },
      thumbnailUrl: {
        type: Sequelize.TEXT
      },
      iconUrl: {
        type: Sequelize.TEXT
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
    options.tableName = "ResturantImages";
    return queryInterface.dropTable(options);
  }
};
