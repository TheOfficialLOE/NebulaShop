const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const { create } = require("../../utilities/query-builder");

router.post("/:product/:comment", hasToken, async (req, res) => {

    const vote = await create(prisma.votes, {
        UserEmail: req.email,
        ProductId: Number(req.params.product),
        CommentId: Number(req.params.comment),
        Type: req.query.type
    });
    if (vote.success)
        return res.json(vote);
    else
        return res.status(400).json("Error occurred...");

});

module.exports = router;