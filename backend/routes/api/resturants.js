const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Resturant, MenuItem, ResturantTime, Review, ResturantImage } = require('../../db/models');
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


    console.log("   ONEEEEEEEEE   ")

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
            location: address,
            radius: 10000, // Search radius in meters (adjust as needed)
            type: 'restaurant',
            key: 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k'
        }
    });

    const resturants = response.data.results

    for (let restaurant of resturants) {

        location = restaurant.formatted_address
        let addy = location.split(",")
        let addressTwo = addy[0]
        let city = addy[1]
        let state = addy[2]
        state = state.split(" ")[1]
        let zipCode = addy[2]
        zipCode = zipCode.split(" ")[2]

        let franchise = await Resturant.findOne({
            where: {
                name: restaurant.name
            }
        })

        if (franchise) {

            franchise.set({
                address: addressTwo,
                state,
                city,
                zipCode
            })

            await franchise.save()
        }

    }

    const franchises = await Resturant.findAll({
        include: [
            { model: MenuItem },
            { model: ResturantTime },
            { model: Review },
            { model: ResturantImage }

        ]
    })

    for (let franchise of franchises) {

        let miles = await distanceInMiles(location, address)

        franchise.dataValues.miles = miles.toFixed(1)
        franchise.dataValues.minutes = milesToMinutes(Math.round(miles), 60)

    }

    res.json( franchises )

})

router.post('/', async (req, res) => {
    let { address } = req.body
    let location


    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
            location: address,
            radius: 10000, // Search radius in meters (adjust as needed)
            type: 'restaurant',
            key: 'AIzaSyA9ZZhYki6tunwewDOEljGqWu9sSY6VC9k'
        }
    });
    console.log(" TWOOOOOOO ")

    const resturants = response.data.results

    for (let restaurant of resturants) {

        location = restaurant.formatted_address
        let addy = location.split(",")
        let addressTwo = addy[0]
        let city = addy[1]
        let state = addy[2]
        state = state.split(" ")[1]
        let zipCode = addy[2]
        zipCode = zipCode.split(" ")[2]

        let franchise = await Resturant.findOne({
            where: {
                name: restaurant.name
            }
        })

        if (franchise) {

            franchise.set({
                address: addressTwo,
                state,
                city,
                zipCode
            })

            await franchise.save()
        }

    }

    const franchises = await Resturant.findAll({
        include: [
            { model: MenuItem },
            { model: ResturantTime },
            { model: Review },
            { model: Offer },
            { model: ResturantImage }

        ]
    })

    for (let franchise of franchises) {

        let miles = await distanceInMiles(location, address)

        franchise.dataValues.miles = miles.toFixed(1)
        franchise.dataValues.minutes = milesToMinutes(Math.round(miles), 60)

    }

    res.json( franchises )

})




router.get('/:id', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Resturant.findByPk(restaurantId);

    if (!restaurantExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let restaurant =  await Resturant.findByPk(restaurantId, {
        include: [
            { model: ResturantImage },
            { model: ResturantTime },
            {
                model: MenuItem,
                include: [
                    {model: ItemOptions}
                ]
            },
            { model: Offer },
            { model: Review }
        ]
    });


    res.json( restaurant )

})


module.exports = router;
