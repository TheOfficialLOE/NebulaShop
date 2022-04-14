const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.newVote = async (req, res) => {

    /*
        note: you might wonder why there is such operation behind a simple voting process,
        you might think we could just upsert it. Well I tried it, but it was extremely slow, like 100 ms per request,
        while my current implementation takes something around 4 (just reading) ms to 50 ms (writing).
    */

    if (req.query.type !== "like" && req.query.type !== "dislike")
        return res.status(400).json("Unknown action...");

    const checkComment = await prisma.comments.findFirst({
        where: {
            Id: Number(req.params.comment),
            ProductId: Number(req.params.product),
            Stage: "ACCEPTED"
        }
    });

    if (checkComment === null)
        return res.status(400).json("Comment not found...");

    const checkVote = await prisma.votes.findFirst({
        where: {
            ProductId: Number(req.params.product),
            CommentId: Number(req.params.comment),
            UserEmail: req.email
        }
    });

    switch (checkVote) {

        case null: {

            await prisma.votes.create({
               data: {
                   UserEmail: req.email,
                   ProductId: Number(req.params.product),
                   CommentId: Number(req.params.comment),
                   Type: req.query.type.toUpperCase()
               }
            });

            return res.json("Voted...");

        }

        default: {

            await prisma.votes.updateMany({
               where: {
                   UserEmail: req.email,
                   ProductId: Number(req.params.product),
                   CommentId: Number(req.params.comment)
               },
               data: {
                   Type: req.query.type.toUpperCase()
               }
            });

            return res.json("Updated...")

        }
    }

};