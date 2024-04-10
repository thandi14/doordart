const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Resturant, MenuItem, ResturantTime, Review, ResturantImage } = require('../../db/models');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    let address = "1740 Hickory Chase Cir"

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

        let addy = restaurant.formatted_address
        addy = addy.split(",")
        let address = addy[0]
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
                address,
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

    res.json( franchises )

})

module.exports = router;
