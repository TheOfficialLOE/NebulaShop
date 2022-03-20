const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/purchase-model");
const { findMany, create } = require("../../utilities/query-builder");

router.post("/buy", [hasToken, valid(validator)], async (req, res) => {
    const purchase = await create(prisma.purchases, {
        ProductId: Number(req.body.ProductId),
        UserEmail: req.email,
        Count: Number(req.body.Count),
        Address: req.body.Address
    });
    if (purchase.success) {
        purchase.data = _.pick(purchase.data, ["ProductId", "UserEmail", "Count", "Address"])
        return res.json(purchase);
    }
    else {
        if (purchase.data.code === "P2003")
            return res.status(400).json("Product not found...")
        return res.status(400).json("Error occurred...");
    }
});

router.get("/", hasToken, async (req, res) => {
    const purchases = await findMany(prisma.purchases, {
        UserEmail: req.email
    });
    if (purchases.success)
        return res.json(purchases);
    else
        return res.status(400).json("Error occurred...");
});

module.exports = router;