const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Restaurant, ShoppingCart, MenuItem, CartItem, CartItemNotes, ItemSelection } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const { user } = req
    const userId = user.dataValues.id

    if (!cartExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let cart = await ShoppingCart.findAll({
        where : {
            userId,
            status: "Ordering"
        },
        include : [
            { model: CartItem },
            { model: User },
            { model: Restaurant }
        ]
    });


    if (!cart) {

        res.status(404).json({"message": "Shopping Cart couldn't be found"});

    }

    res.json( cart )

})

router.post('/:id', async (req, res) => {
    let restaurantId = req.params.id;
    let restaurantExist = await Restaurant.findByPk(restaurantId);
    let { cartId } = req.body;
    const { user } = req
    const userId = user.dataValues.id

    if (!restaurantExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let cart = await ShoppingCart.create({
        restaurantId,
        userId,
    })

    let c = await ShoppingCart.findByPk(cart.dataValues.id, {
        include : [
            { model: CartItem },
            { model: User },
            { model: Restaurant }
        ]
    });

    res.json( c )

})

router.post('/:id/item', async (req, res) => {
    let cartId = req.params.id;
    let cartExist = await ShoppingCart.findByPk(cartId);
    let { itemId, options, quantity } = req.body;
    const { user } = req
    const userId = user.dataValues.id

    if (!cartExist) {

        res.status(404).json({"message": "Restaurant couldn't be found"});

    }

    let itemsExist = await CartItem.findAll({
        where: {
            cartId,
            itemId
        },
        include: [
            { model: CartItemNotes }
        ]
    })

    let c
    let more = false

    for (let itemExist of itemsExist) {
        let notes = itemExist.dataValues.CartItemNotes
        more = notes.length == 0 && options.length == 0 ? true : false
        if (!more && notes.length) {
            more = options.every(option =>
                notes.some(note => note.dataValues.selectionId === option)
            );
        }

        if (more) {
            let ci = await CartItem.findByPk(itemExist.dataValues.id)
            let q = ci.dataValues.quantity + quantity

            let newCi = ci.set({
                quantity: q
            })

            await newCi.save()

            c = await CartItem.findByPk(itemExist.dataValues.id, {
                include : [
                    {
                        model: MenuItem
                    },
                    {
                        model: CartItemNotes,
                        include : [
                            {
                                model: ItemSelection,
                            }
                        ]
                    },
                    { model: ShoppingCart },
                ]

            });

             res.json( c )
        }

        console.log(itemExist.dataValues.CartItemNotes, more)
    }

    if (!more) {

        let item = await CartItem.create({
            cartId,
            quantity,
            itemId,
        })

        if (options?.length) {
            for (let selectionId of options) {
                let selected = await CartItemNotes.create({
                    itemId: item.dataValues.id,
                    selectionId
                })
            }
        }


        c = await CartItem.findByPk(item.dataValues.id, {
            include : [
                {
                    model: MenuItem
                 },
                 {
                    model: CartItemNotes,
                    include : [
                        {
                            model: ItemSelection,
                        }
                    ]
                },
                { model: ShoppingCart },
            ]
        });

    }

    res.json( c )

})

router.put('/:id/item', async (req, res) => {
    let itemId = req.params.id;
    let itemExsit = await CartItem.findByPk(itemId);
    let { quantity } = req.body;
    const { user } = req
    const userId = user.dataValues.id

    if (!itemExsit) {

        res.status(404).json({"message": "Cart item couldn't be found"});

    }

    let item = await itemExsit.set({
        quantity
    })

    await item.save()

    let i = await CartItem.findByPk(itemId, {
        include : [
            {
                model: MenuItem
             },
             {
                model: CartItemNotes,
                include : [
                    {
                        model: ItemSelection,
                    }
                ]
            },
            { model: ShoppingCart },
        ]
    });



    res.json( i )

})

router.delete('/:id', async (req, res) => {
    let cartId = req.params.id;
    let cartExist = await ShoppingCart.findByPk(cartId);

    if (!cartExist) {

        res.status(404).json({"message": "Shopping Cart couldn't be found"});

    }

    cartExist.destroy()

    res.json( {message: "Shopping Cart sucessfully deleted"} )

})


router.delete('/:id/item', async (req, res) => {
    let itemId = req.params.id;
    let itemExsit = await CartItem.findByPk(itemId);

    if (!itemExsit) {

        res.status(404).json({"message": "Cart Item couldn't be found"});

    }

    itemExsit.destroy()

    res.json( {message: "Cart Item sucessfully deleted"} )

})


module.exports = router;