const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/cart-model");

router.get("/", hasToken, async (req, res) => {

    await prisma.cart.findMany({
       where: {
           UserEmail: req.email
       }
    }).then(data => {
        return res.json(data);
    }).catch(err => {
        return res.status(400).json(err);
    });
});

router.post("/add", [hasToken, valid(validator)], async (req, res) => {

    // todo: don't let the user to add multiple same product to the cart

    await prisma.cart.create({
        data: {
            UserEmail: req.email,
            ProductId: req.body.ProductId,
            Count: req.body.Count
        }
    }).then(data => {
        return res.json(data);
    }).catch(err => {
        if (err.code === "P2003")
            return res.status(400).json("Product not found...")
       return res.status(400).json("Error occurred...");
    });
});


module.exports = router;