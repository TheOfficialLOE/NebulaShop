const express = require("express");
const router  = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { create } = require("../../utilities/query-builder");
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validate = require("../../models/comment-model");

router.post("/new", [hasToken, valid(validate)], async (req, res) => {

    const comment = await create(prisma.comments, {
        ProductId: req.body.ProductId,
        UserEmail: req.email,
        Text: req.body.Text
    });

    if (comment.success)
        return res.json(comment);
    else
        return res.status(400).json(comment);

});

module.exports = router;