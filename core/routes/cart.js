const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/cart-model");

router.get("/", hasToken, async (req, res) => {
    await prisma.purchases.findMany({
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
    await prisma.purchases.create({
        data: {
            UserEmail: req.email,
            ProductId: req.body.ProductId,
            Count: req.body.Count
        }
    }).then(data => {
        return res.json(data);
    }).catch(err => {
       return res.status(400).json(err);
    });
});


module.exports = router;