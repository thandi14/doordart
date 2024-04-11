'use strict';
const bcrypt = require("bcryptjs");
const { Resturant } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Resturant.bulkCreate([
      {
        name: "McDonald's",
        deliveryFee: 2.99,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Jack in the Box",
        deliveryFee: 3.99,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Buffalo Wild Wings",
        deliveryFee: 3.99,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Freddy's Frozen Custard Steakburgers",
        deliveryFee: 3.49,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Cicis Pizza",
        deliveryFee: 2.29,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Sonic Drive-In",
        deliveryFee: 3.99,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Wendy's",
        deliveryFee: 2.49,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Taco Bell",
        deliveryFee: 2.99,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Chicken Express",
        deliveryFee: 0,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Jack in the Box",
        deliveryFee: 2.49,
        type: "fast food",
        pickup: true,
      },
      {
        name: "Cracker Barrel",
        deliveryFee: 0.49,
        type: "restaurant",
        pickup: true,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Resturants';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
