const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getAllComments = async (req, res) => {

    const comments = await prisma.comments.findMany({
        select: {
            UserEmail: true,
            ProductId: true,
            Text: true,
            Date: true,
            Votes: true,
            Stage: true
        }
    }).catch(err => {
        throw { code: 400, message: "Error occurred..." };
    });

    return res.json(comments);

};

module.exports.checkComment = async (req, res) => {

    const check = await prisma.comments.update({
        where: {
            Id: req.body.CommentId
        },
        data: {
            Stage: req.body.Stage
        }
    }).catch(err => {
        if (err.code === "P2025")
            throw { code: 400, message: "Comment not found..." };
        throw { code: 400, message: "Error occurred..." };
    });

    return res.json(check);


};