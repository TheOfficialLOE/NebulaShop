const express = require("express");
const router = express.Router();
const { PrismaClient }= require("@prisma/client");
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
    await prisma.products.findMany({
        select: {
            BrandName: true,
            Name: true
        }
    }).then(data => {
        return res.json(data);
    }).catch(err => {
        return res.status(400).json(err);
    });
});

router.get("/:brand", async (req, res) => {

    await prisma.products.findMany({
      where: {
          BrandName: req.params.brand
      },
        select: {
          BrandName: true,
            Name: true
        }
   }).then(data => {
       return res.json(data);
    }).catch(err => {
        return res.status(400).json(err);
    });

});

router.get("/:brand/:product", async (req, res) => {

    await prisma.products.findFirst({
       where: {
           BrandName: req.params.brand,
           Id: Number(req.params.product)
       },
        select: {
           BrandName: true,
            Name: true,
            Description: true,
            Info: true,
            Price: true
        }
    }).then(data => {
        return res.json(data);
    }).catch(err => {
        console.log(err);
        return res.status(400).json(err);
    });


});

module.exports = router;