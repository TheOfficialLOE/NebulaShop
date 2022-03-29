const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hasToken } = require("../../middlewares/token-validator");
const { update } = require("../../utilities/query-builder");

router.post("/:product/:comment", hasToken, async (req, res) => {

    const vote = await update(prisma.comments, {
        Id: Number(req.params.comment)
    }, {
        Votes: {
            upsert: {
                create: {
                    UserEmail: req.email,
                    Type: req.query.type.toUpperCase()
                },
                update: {
                    UserEmail: req.email,
                    Type: req.query.type.toUpperCase()
                }
            }
        }
    });

    if (vote.success)
        return res.json("Vote submitted...");
    else
        return res.status(400).json("Error occurred...");

});

module.exports = router;