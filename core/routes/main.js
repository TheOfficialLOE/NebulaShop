const express = require("express");
const router = express.Router();
const { PrismaClient }= require("@prisma/client");
const prisma = new PrismaClient();
const { findMany, findFirst } = require("../../utilities/query-builder");


router.get("/", async (req, res) => {

    const products = await findMany(prisma.products, {}, {
        BrandName: true,
        Name: true
    });

    if (products.success)
        return res.json(products);
    else
        return res.status(400).json("Error occurred...");

});

router.get("/:brand", async (req, res) => {

    const products = await findMany(prisma.products, {
        BrandName: req.params.brand
    }, {
        BrandName: true,
        Name: true,
        Price: true
    });

    if (products.success) {
        if (products.data.length !== 0)
            return res.json(products);
        else
            return res.status(400).json("Brand not found...")
    }
    else
        return res.status(400).json("Error occurred...");

});

router.get("/:brand/:product", async (req, res) => {

    const product = await findFirst(prisma.products, {
        Id: Number(req.params.product),
        BrandName: req.params.brand
    }, {
        BrandName: true,
        Name: true,
        Description: true,
        Info: true,
        Price: true,
        Comments: {
          select: {
              UserEmail: true,
              Text: true,
              Votes: {
                  select: {
                      UserEmail: true,
                      Type: true
                  }
              }
          }
        }
    });

    if (product.success)
        return res.json(product);
    else
        return res.status(400).json("Error occurred...");


});

module.exports = router;