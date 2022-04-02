const express = require("express");
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/purchase-model");
const { findMany, createMany, update } = require("../../utilities/query-builder");

router.post("/buy", [hasToken, valid(validator)], async (req, res) => {

    const order = _.map(req.body, element => _.extend({ UserEmail: req.email }, element));
    const dbUpdate = _.map(req.body, element => ({ Id: element.ProductId, Count: element.Count }));
    const purchase = await createMany(prisma.purchases, order);

    if (purchase.success) {

        await Promise.all(
            dbUpdate.map(async info => {
                await update(prisma.products, {
                    Id: info.Id
                }, {
                    Remaining: {
                        decrement: info.Count
                    }
                });
            })
        ).then(data => {
            return res.json("Purchase completed...");
        }).catch(err => {
           return res.status(400).json("Error occurred...");
        });

    } else {
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