const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const MyPrismaException = require("../../utilities/MyPrismaException");

module.exports.getAllCartItems = async (req, res) => {

    const items = await prisma.cart.findMany({
        where: {
            UserEmail: req.email
        }
    });

    return res.json(items);

};

module.exports.addToCart = async (req, res) => {

    const card = await prisma.cart.findFirst({
        where: {
            UserEmail: req.email,
            ProductId: req.body.ProductId
        }
    });


    switch (card) {
        case null: {

            await prisma.cart.create({
                data: {
                    UserEmail: req.email,
                    ProductId: req.body.ProductId,
                    Count: req.body.Count
                }
            }).catch(err => {
                if (err.code === "P2003")
                    throw new MyPrismaException(400, "Product not found...");
            });

            return res.json("Added an Item...");

        }

        default: {

            await prisma.cart.updateMany({
                where: {
                    UserEmail: req.email,
                    ProductId: req.body.ProductId
                },
                data: {
                    Count: {
                        increment: req.body.Count
                    }
                }
            });

            return res.json("Updated an item...");

        }
    }

};