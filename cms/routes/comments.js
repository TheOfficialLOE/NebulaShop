const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { cms } = require("../../middlewares/token-validator");

router.get("/", cms, async (req, res) => {

    await prisma.comments.findMany({
        select: {
            UserEmail: true,
            ProductId: true,
            Text: true,
            Date: true,
            Votes: true,
            Stage: true
        }
    }).then(data => {
        return res.json(data);
    }).catch(err => {
        console.log(err);
        return res.status(400).json("Error occurred...");
    });

});


module.exports = router;