const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { cms } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/products-model");

// We'll manage products CRUD operations here...


router.post("/newProduct", [cms, valid(validator.product)], async (req, res) => {
    await prisma.products.create({
        data: {
            Name: req.body.Name,
            Description: req.body.Description,
            Info: req.body.Info,
            BrandName: req.body.Brand,
            Remaining: req.body.Remaining,
            CreatedBy: req.email,
            Price: req.body.Price
        },
        include: {
            Purchases: true
        }
    }).then(data => {

        return res.json(data);


    }).catch(err => {
        if (err.code === "P2003")
            return res.status(400).json("Brand not found")
        return res.status(400).json("Error occurred...");
    });
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
        else if (err.code === "P2003")
            return res.status(403).json("User not found...")
        return res.status(400).json("Error occurred...");
    });
});


module.exports = router