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
        category: "Combo Meals, Mcnuggets & Meals",
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
        item: "6 pc. Chicken McNuggets® Happy Meal®",
        description: "Enjoy a McDonald’s Happy Meal® and get six tender Chicken McNuggets® made with white meat with kid-sized World Famous Fries and a side of Apple Slices. Then pick a kids’ drink. Plus, every McDonald’s kids’ meal comes with a McDonald’s Happy Meal® toy!",
        cals: "430 - 530",
        price: 5.99,
        category: "Combo Meals, Mcnuggets & Meals, Happy Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/422b22f9-5042-424c-b4ab-617250d2898c-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "French Fries",
        description: "McDonald's World Famous Fries® are made with premium potatoes such as the Russet Burbank and the Shepody. With 0g of trans fat per labeled serving, these epic fries are crispy and golden on the outside and fluffy on the inside.",
        cals: "230 - 480",
        price: 2.59,
        category: "Individual Items, Fries",
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
      {
        restaurantId: 1,
        item: "40 pc. Spicy Chicken McNuggets® & 2 Large Fries",
        cals: "2670 cal",
        price: 24.99,
        category: "Shareables",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/7c408ce3-0fd9-4359-b709-ff53c247f92e-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Basket of Fries",
        cals: "630 cal",
        price: 5.59,
        category: "Shareables",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/0822f132-2d31-438f-9463-0f82644ddcde-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "13 Cookie Tote",
        cals: "1820 - 2210 cal",
        price: 5.59,
        category: "Shareables",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/ac521aff-f1a7-4579-9add-e590ee1ab065-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "20 pc. Spicy Chicken McNuggets® & 2 Medium Fries",
        cals: "1490 cal",
        price: 15.99,
        category: "Shareables",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/622297b0-5e98-446d-97ad-80537b1fc16f-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Hamburger Happy Meal®",
        description: "McDonald's Hamburger Happy Meal® includes a juicy McDonald's Hamburger with kid sized world famous fries and apple slices. Then pick a kid’s drink. Plus, a McDonald’s Happy Meal® toy that completes every McDonald’s Kids meal.",
        cals: "380 - 510 cal",
        price: 4.69,
        category: "Happy Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/16f81769-9ea2-430a-b923-3f9e00f2aefa-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "4 pc. Chicken McNugget® Happy Meal®",
        description: "Grab a McDonald’s Happy Meal® and get four tender Chicken McNuggets® made with white meat with kid-sized World Famous Fries and a side of Apple Slices. Then pick a kids’ drink. Plus, a fun toy completes every McDonald's kid's meal.",
        cals: "300 - 430 cal",
        price: 5.19,
        category: "Happy Meals",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/16f81769-9ea2-430a-b923-3f9e00f2aefa-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Mocha Frappe",
        description: "Enjoy McCafé®'s cold and creamy Mocha Frappé. Wondering what’s in a Mocha Frappé from McDonald’s? Made with rich chocolate flavor and a hint of coffee, our Mocha Frappé recipe is blended with ice and topped with whipped light cream and chocolatey drizzle.",
        cals: "430 - 660 cal",
        price: 5.29,
        category: "McCafé® Coffees",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/19245278-bece-4fd2-aa42-2a17c6db4f8d-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Caramel Frappe",
        description: "McDonald's Caramel Frappé recipe is made with rich caramel flavor and a hint of coffee, blended with ice, and topped with whipped topping and caramel drizzle.",
        cals: "420 - 650 cal",
        price: 5.29,
        category: "McCafé® Coffees",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/19245278-bece-4fd2-aa42-2a17c6db4f8d-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Iced French Vanilla Latte",
        description: "Cool down with a McCafé® Iced French Vanilla Latte, made with Rainforest Alliance Certified™ espresso. Our McDonald’s Iced Vanilla Latte recipe features bold espresso, whole milk and sweet French vanilla syrup.",
        cals: "420 - 650 cal",
        price: 5.29,
        category: "McCafé® Coffees",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/5eb72f5b-d2cd-41b2-9549-ab14f085f989-retina-large.jpg"
      },
      {
        restaurantId: 1,
        item: "Iced Mocha",
        description: "Made with sustainably sourced espresso beans from Rainforest Alliance Certified™ farms, our refreshingly cool Iced Mocha Latte recipe is made with whole milk, chocolate syrup, and finished with whipped light cream and chocolate drizzle.",
        cals: "270 - 440 cal",
        price: 4.59,
        category: "McCafé® Coffees",
        imgUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/a4a50ec3-4329-4cb0-9535-6a8d8d4d5b01-retina-large.jpg"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MenuItems';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
