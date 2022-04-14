const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const MyPrismaException = require("../../utilities/MyPrismaException");
const _ = require("lodash");

module.exports.newComment = async (req, res) => {

    const blackList = ["somethingOffensive"];
    const textSubStr = req.body.Text.split(" ");
    let stage = "PROCESSING";
    textSubStr.some(value => {
        if (blackList.includes(value.toLowerCase())) {
            stage = "REJECTED";
        }
    });


    let comment = await prisma.comments.create({
       data: {
           ProductId: req.body.ProductId,
           UserEmail: req.email,
           Text: req.body.Text,
           Stage: stage
       }
    }).catch(err => {
        if (err.code === "P2003")
            throw new MyPrismaException(400, "Product not found...");
    });

    if (stage === "REJECTED")
        // this is not an Exception of type MyPrismaException so I won't throw it.
        return res.status(400).json("Disapproval...");

    comment = _.pick(comment, ["ProductId", "Date", "Text"]);

    return res.json(comment);


};