'use strict';

const { MenuItem } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await MenuItem.bulkCreate([
      {
        restaurantId: 1,
        item: "10 Piece McNuggets Meal",
        description: "The 10 Piece McNuggets Meal comes with a 10 Piece McNuggets, McDonald's World Famous Fries®, and a Drink. Enjoy tender, juicy Chicken McNuggets® with your favorite dipping Sauces. Wondering what are McDonald's Chicken Nuggets made of? Chicken McNuggets® are made with all white meat chicken and no artificial colors, flavors, or preservatives.",
        cals: "740 - 980",
        price: 9.49,
        category: "Combo Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/44ada25a-987c-4295-8818-da57cfd60f0a-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Big Mac Meal",
        description: "The Big Mac Meal comes with a Big Mac, McDonald's World Famous Fries®, and a Drink. Ever wondered what's on a Big Mac®? The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It’s topped off with pickles, crisp shredded lettuce, finely chopped onion, and a slice of American cheese. It contains no artificial flavors, preservatives, or added colors from artificial sources. Our pickle contains an artificial preservative, so skip it if you like.",
        cals: "910 - 1150",
        price: 8.89,
        category: "Combo Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/335aa95b-76ec-43f7-8f56-64e090ad0919-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Double Cheeseburger",
        description: "The McDonald's Double Cheeseburger features two 100% pure all beef patties seasoned with just a pinch of salt and pepper. It's topped with tangy pickles, chopped onions, ketchup, mustard, and two melty American cheese slices. Wondering what is the difference between McDouble and Double Cheeseburger? It's the extra slice of American cheese in the Double Cheeseburger.",
        cals: "450",
        price: 3.59,
        category: "Individual Items",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/bf56fe28-8689-45cf-8d47-8e1944743734-retina-large.jpg",
      },
      {
        restaurantId: 1,
        item: "20 Piece McNuggets",
        description: "Enjoy tender, juicy Chicken McNuggets® with your favorite dipping Sauces. Wondering what are McDonald's Chicken Nuggets made of? Chicken McNuggets® are made with all white meat chicken and no artificial colors, flavors, or preservatives.",
        cals: "830",
        price: 8.29,
        category: "Individual Items",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/af2958fc-5413-4611-9971-898f767d6fd2-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "6pc Chicken McNuggets Happy Meal",
        description: "Enjoy a McDonald’s Happy Meal® and get six tender Chicken McNuggets® made with white meat with kid-sized World Famous Fries and a side of Apple Slices. Then pick a kids’ drink. Plus, every McDonald’s kids’ meal comes with a McDonald’s Happy Meal® toy!",
        cals: "430 - 530",
        price: 5.99,
        category: "Combo Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/422b22f9-5042-424c-b4ab-617250d2898c-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "French Fries",
        description: "McDonald's World Famous Fries® are made with premium potatoes such as the Russet Burbank and the Shepody. With 0g of trans fat per labeled serving, these epic fries are crispy and golden on the outside and fluffy on the inside.",
        cals: "230 - 480",
        price: 2.59,
        category: "Individual Items",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/dfd0ab4e-3e54-4829-a505-37a91417c98f-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Hot and Spicy McChicken",
        cals: "400",
        price: 9.49,
        category: "Individual Items",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/7872ab2c-d5f7-4c84-8f81-a235225f8337-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Double Quarter Pounder with Cheese Meal",
        description: "The Double Quarter Pounder with Cheese Meal comes with a Double Quarter Pounder with Cheese, McDonald's World Famous Fries®, and a Drink. Each Double Quarter Pounder with Cheese features two quarter pound 100% fresh beef burger patties that are hot, deliciously juicy and cooked when you order. McDonald’s beef patties are seasoned with just a pinch of salt and pepper, sizzled on a flat iron grill, then topped with slivered onions, tangy pickles and two slices of melty cheese on a sesame seed bun. It contains no artificial flavors, preservatives or added colors from artificial sources. Our pickle contains an artificial preservative, so skip it if you like.",
        cals: "1060 - 1300 cal",
        price: 10.69,
        category: "Combo Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/81a426ee-9c34-4dc6-84f2-4895d355509d-retina-large.jpg"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MenuItems';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
