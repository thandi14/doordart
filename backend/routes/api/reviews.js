const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Restaurant, Review, MenuItem } = require('../../db/models');

const router = express.Router();


router.put('/:id', async (req, res) => {
    let reviewId = req.params.id;
    let reviewExist = await Review.findByPk(reviewId);
    let { review, rating } = req.body;

    if (!reviewExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let rr = await reviewExist.set({
        review,
        rating,
    })

    let r = await Review.findByPk(rr.dataValues.id, {
        include : [
            { model: User }
        ]
    });



    res.json( r )

})


router.delete('/:id', async (req, res) => {
    let reviewId = req.params.id;
    let reviewExist = await Review.findByPk(reviewId);

    if (!reviewExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    reviewExist.destroy()

    res.json( {message: "Review sucessfully deleted"} )

})


module.exports = router;
