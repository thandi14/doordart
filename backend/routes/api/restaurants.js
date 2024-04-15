const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Restaurant, MenuItem, RestaurantTime, Review, RestaurantImage, Offer, ItemOption, ShoppingCart, CartItem, CartItemNotes, ItemSelection } = require('../../db/models');
const axios = require('axios');
const geolib = require('geolib'); //

const router = express.Router();


// Define a route to calculate the distance between two addresses
const geocodeAddress = async (address) => {
    const apiKey = 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error('Failed to geocode address');
    }
  };

  const distanceInMiles = async (address1, address2) => {

    try {
      // Geocode the addresses to get their coordinates
      const { lat: lat1, lng: lng1 } = await geocodeAddress(address1);
      const { lat: lat2, lng: lng2 } = await geocodeAddress(address2);

      // Calculate the distance between the two locations using geolib
      const distanceInMeters = geolib.getDistance(
        { latitude: lat1, longitude: lng1 },
        { latitude: lat2, longitude: lng2 }
      );

      // Convert the distance to miles
      const distanceInMiles = geolib.convertDistance(distanceInMeters, 'mi');

      return distanceInMiles

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const milesToMinutes = (distanceInMiles, speedInMph) => {
    // Convert speed from miles per hour to miles per minute
    const speedInMpm = speedInMph / 60;

    // Calculate time in minutes
    const timeInMinutes = distanceInMiles / speedInMpm;

    return timeInMinutes;
  };

router.get('/', async (req, res) => {
    let address = "1740 Hickory Chase Cir"
    let location

    let restaurants = await Restaurant.findAll()

    const requests = restaurants.map(async (restaurant) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: restaurant.name,
                location: address,
                radius: 50000, // Search radius in meters (adjust as needed)
                key: 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k'
            }
        });


        const places = response.data.results;
        let location = ""

        if (places.length > 0) {
            location = places[0].formatted_address;
        }

        let franchise = await Restaurant.findOne({
            where: {
                name: restaurant.name
            }
        });

        if (franchise) {
            let distance = await distanceInMiles(location, address);
            let miles = 1;
            let mins = 0;

            if (distance) {
                miles = distance.toFixed(1);
                mins = milesToMinutes(Math.round(miles), 60);
            }

            franchise.set({
                address: location,
                miles,
                mins,
                franchiseId: places[0].place_id
            });

            await franchise.save();
        }


    })

    const franchises = await Restaurant.findAll({
        include: [
            { model: MenuItem },
            { model: RestaurantTime },
            { model: Review },
            { model: Offer },
            { model: RestaurantImage }

        ]
    })

    res.json( franchises )

})

router.post('/', async (req, res) => {
    let { address } = req.body
    let location

    let restaurants = await Restaurant.findAll()

    const requests = restaurants.map(async (restaurant) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                place_id: 'PLACE_ID',
                query: restaurant.name,
                location: address,
                radius: 50000, // Search radius in meters (adjust as needed)
                key: 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k'
            }
        });


        const places = response.data.results;
        let location = ""

        if (places.length > 0) {
            location = places[0].formatted_address;
        }

        let franchise = await Restaurant.findOne({
            where: {
                name: restaurant.name
            }
        });

        if (franchise) {
            let distance = await distanceInMiles(location, address);
            let miles = 1;
            let mins = 0;

            if (distance) {
                miles = distance.toFixed(1);
                mins = milesToMinutes(Math.round(miles), 60);
            }

            franchise.set({
                address: location,
                miles,
                mins,
                franchiseId: places[0].place_id
            });

            await franchise.save();
        }


    })

    const franchises = await Restaurant.findAll({
        include: [
            { model: MenuItem },
            { model: RestaurantTime },
            { model: Review },
            { model: Offer },
            { model: RestaurantImage }

        ]
    })

    res.json( franchises )

})

router.get('/:id/cart', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    const { user } = req
    const userId = user.dataValues.id

    if (!restaurantExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let cart = await ShoppingCart.findOne({
        where : {
            userId,
            restaurantId,
            status: "Ordering"
        },
        include : [
            {
                model: CartItem,
                include : [
                    {
                        model: MenuItem,
                    },
                    {
                        model: CartItemNotes,
                        include : [
                            {
                                model: ItemSelection,
                            }
                        ]
                    }
                ]
             },
            { model: User },
            { model: Restaurant }
        ]
    });


    if (!cart) {

        res.status(404).json({"message": "Shopping Cart couldn't be found"});

    }

    res.json( cart )

})


router.get('/:id/reviews', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    if (!restaurantExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let reviews = await Review.findAll({
        where: {
            restaurantId
        },
        include : [
            { model: User }
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize
    });

    res.json( reviews )

})

router.post('/:id', async (req, res) => {
    let { address } = req.body
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);

    if (!restaurantExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let restaurant =  await Restaurant.findByPk(restaurantId, {
        include: [
            { model: RestaurantImage },
            { model: RestaurantTime },
            {
                model: MenuItem,
                include: [
                    { model: ItemOption }
                ]
            },
            { model: Offer },
            { model: Review,
                include: [
                    { model: User }
                ]
             }
        ]
    });

    res.json( restaurant )

})

router.post('/:id/review', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    let { review, rating, franchiseId } = req.body;
    const { user } = req
    const userId = user.dataValues.id

    if (!restaurantExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let rr = await Review.create({
        restaurantId,
        userId,
        review,
        rating,
        franchiseId
    })

    let r = await Review.findByPk(rr.dataValues.id, {
        include : [
            { model: User }
        ]
    });

    res.json( r )

})



module.exports = router;