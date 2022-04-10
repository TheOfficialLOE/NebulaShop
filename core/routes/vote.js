const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const { findFirst, create, updateMany } = require("../../utilities/query-builder");

router.post("/:product/:comment", hasToken, async (req, res) => {

/*
    note: you might wonder why there is such operation behind a simple voting process,
    you might think we could just upsert it. Well I tried it, but it was extremely slow, like 100 ms per request,
    while my current implementation takes something around 4 (just reading) ms to 50 ms (writing).
*/

    // todo: user can only vote to accepted comments by admins

    if (req.query.type !== "like" && req.query.type !== "dislike")
        return res.status(400).json("Unknown action...")

    const checkComment = await findFirst(prisma.comments, {
        Id: Number(req.params.comment),
        ProductId: Number(req.params.product)
    });

    if (checkComment.success === false || checkComment.data === null)
        return res.status(400).json("Comment not found...");

    const checkVote = await findFirst(prisma.votes, {
        ProductId: Number(req.params.product),
        CommentId: Number(req.params.comment),
        UserEmail: req.email
    });

    switch (checkVote.success) {
        case false: {
            return res.status(400).json("Error occurred...");
        }
        case true: {
            switch (checkVote.data) {

                case null: {

                    const vote = await create(prisma.votes, {
                        UserEmail: req.email,
                        ProductId: Number(req.params.product),
                        CommentId: Number(req.params.comment),
                        Type: req.query.type.toUpperCase()
                    });

                    if (vote.success)
                        return res.json("Voted...");
                    else
                        return res.status(400).json("Error occurred...");

                }

                default: {

                    const updatedVote = await updateMany(prisma.votes, {
                        UserEmail: req.email,
                        ProductId: Number(req.params.product),
                        CommentId: Number(req.params.comment)
                    }, {
                        Type: req.query.type.toUpperCase()
                    });

                    if (updatedVote.success)
                        return res.json("Updated...")
                    else
                        return res.status(400).json("Error occurred...")

                }
            }
        }
    }

});

module.exports = router;