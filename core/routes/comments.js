const express = require("express");
const router  = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const { create } = require("../../utilities/query-builder");
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validate = require("../../models/comment-model");

router.post("/new", [hasToken, valid(validate)], async (req, res) => {

    const blackList = ["somethingOffensive"];
    const textSubStr = req.body.Text.split(" ");
    let stage = "PROCESSING";
    textSubStr.some(value => {
        if (blackList.includes(value.toLowerCase())) {
            stage = "REJECTED";
        }
    });

    const comment = await create(prisma.comments, {
        ProductId: req.body.ProductId,
        UserEmail: req.email,
        Text: req.body.Text,
        Stage: stage
    });

    if (comment.success) {

        if (stage === "REJECTED")
            return res.status(400).json("Disapproval...");

        comment.data = _.pick(comment.data, ["ProductId", "Date", "Text"]);

        return res.json(comment);
    }
    else {
        if (comment.data.code === "P2003")
            return res.status(400).json("Product not found...");
        return res.status(400).json("Error occurred...");
    }

});

module.exports = router;