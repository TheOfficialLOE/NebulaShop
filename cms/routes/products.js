const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { cms } = require("../../middleware/token-validator");
const valid = require("../../middleware/joi-validator");
const validator = require("../../models/products-model");

// We'll manage products CRUD operations here...


router.post("/newProduct", cms, async (req, res) => {
    return res.json(product)
});

router.post("/newBrand", [cms, valid(validator.brand)], async (req, res) => {
    await prisma.brands.create({
        data: {
            Name: req.body.Name,
            BrandDetails: req.body.Details,
            CreatedBy: req.email
        },
        include: {
            Products: true
        }
    }).then(data => {

        return res.json(data);


    }).catch(err => {
        if (err.code === "P2002")
            return res.status(400).json("Brand already exists...");
        return res.status(400).json("Error occurred...");
    });
});


module.exports = router