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

module.exports = router;