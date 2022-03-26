const express = require("express");
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/cart-model");
const { findMany, findFirst, create, updateMany } = require("../../utilities/query-builder");

router.get("/", hasToken, async (req, res) => {

    const cart = await findMany(prisma.cart, {
        UserEmail: req.email
    });

    if (cart.success)
        return res.json(cart);
    else
        return res.status(400).json("Error occurred...");

});

router.post("/add", [hasToken, valid(validator)], async (req, res) => {

    const cart = await findFirst(prisma.cart, {
        UserEmail: req.email,
        ProductId: req.body.ProductId
    });


    switch (cart.success) {
        case false: {
            return res.status(400).json("Error occurred...");
        }
        case true: {
            switch (cart.data) {
                case null: {
                    const item = await create(prisma.cart, {
                        UserEmail: req.email,
                        ProductId: req.body.ProductId,
                        Count: req.body.Count
                    });

                    if (item.success === false) {
                        if (item.data.code === "P2003")
                            return res.status(400).json("Product not found...")
                        else
                            return res.status(400).json("Error occurred...");
                    } else {
                        return res.json("Added an Item...");
                    }
                }

                default: {
                    const updatedItem = await updateMany(prisma.cart, {
                        UserEmail: req.email,
                        ProductId: req.body.ProductId
                    }, {
                        Count: {
                            increment: req.body.Count
                        }
                    });

                    if (updatedItem.success)
                        return res.json("Updated an item...");
                    else
                        return res.status(400).json("Error occurred...");
                }


            }

        }
    }

});


module.exports = router;