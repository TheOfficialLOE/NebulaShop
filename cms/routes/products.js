const express = require("express");
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const {cms} = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/products-model");
const {create} = require("../../utilities/query-builder");

// We'll manage products CRUD operations here...


router.post("/newProduct", [cms, valid(validator.product)], async (req, res) => {


    const product = await create(prisma.products, {
        Name: req.body.Name,
        Description: req.body.Description,
        Info: req.body.Info,
        BrandName: req.body.Brand,
        Remaining: req.body.Remaining,
        CreatedBy: req.email,
        Price: req.body.Price
    }, {
        Purchases: true
    });

    if (product.success)
        return res.json(product);
    else {
        if (product.data.code === "P2003")
            return res.status(400).json("Brand not found")
        return res.status(400).json("Error occurred...");
    }

});

router.post("/newBrand", [cms, valid(validator.brand)], async (req, res) => {


    const brand = await create(prisma.brands, {
        Name: req.body.Name,
        BrandDetails: req.body.Details,
        CreatedBy: req.email
    }, {
        Products: true
    });

    if (brand.success)
        return res.json(brand);
    else {
        if (brand.code === "P2002")
            return res.status(400).json("Brand already exists...");
        else if (brand.code === "P2003")
            return res.status(403).json("User not found...");
        return res.status(400).json("Error occurred...");
    }


});


module.exports = router