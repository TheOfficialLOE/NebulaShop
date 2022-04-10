const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/check-comment-model");
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

router.post("/check", [cms, valid(validator)], async (req, res) => {

    const check = await prisma.comments.update({
        where: {
            Id: req.body.CommentId
        },
        data: {
            Stage: req.body.Stage
        }
    }).catch(err => {
        return res.status(400).json("Error occurred...");
    });

    return res.json(check);

});


module.exports = router;