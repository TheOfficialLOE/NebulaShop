const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const MyPrismaException = require("../../utilities/MyPrismaException");

module.exports.getAllPurchases = async (req, res) => {

    const purchases = await prisma.purchases.findMany({
        where: {
            UserEmail: req.email
        }
    });

    return res.json(purchases);

};

module.exports.newPurchase = async (req, res) => {

    const order = _.map(req.body, element => _.extend({UserEmail: req.email}, element));
    const dbUpdate = _.map(req.body, element => ({Id: element.ProductId, Count: element.Count}));

    await prisma.purchases.createMany({
        data: order
    }).catch(err => {
        if (err.code === "P2003")
            throw new MyPrismaException(400, "Product not found...");
    });

    await Promise.all(
        dbUpdate.map(async info => {

            await prisma.products.update({
                where: {
                    Id: info.Id
                },
                data: {
                    Remaining: {
                        decrement: info.Count
                    }
                }
            })
        })
    )

    return res.json("Purchase completed...");

};