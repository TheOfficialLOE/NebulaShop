const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/cart-model");
const { findMany, create } = require("../../utilities/query-builder");

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

    // todo: don't let the user to add multiple same product to the cart

    const item = await create(prisma.cart, {
        UserEmail: req.email,
        ProductId: req.body.ProductId,
        Count: req.body.Count
    });

    if (item.success)
        return res.json(item);
    else
        return res.status(400).json("Error occurred...");

});


module.exports = router;