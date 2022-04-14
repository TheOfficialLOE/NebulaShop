const { PrismaClient }= require("@prisma/client");
const prisma = new PrismaClient();
const MyPrismaException = require("../../utilities/MyPrismaException");

module.exports.getAllProducts = async (req, res) => {

    const products = await prisma.products.findMany({
        select: {
            BrandName: true,
            Name: true
        }
    });

    return res.json(products);

};

module.exports.search = async (req, res) => {

    if (req.query.query === undefined)
        return res.status(400).json("Please enter a search query....");

    const items = await prisma.products.findMany({
        where: {
            Name: {
                contains: req.query.query
            },
            BrandName: {
                contains: req.body.Brand || undefined
            },
            Price: {
                gte: req.body.MinPrice || undefined,
                lte: req.body.MaxPrice || undefined
            }
        }, select: {
            BrandName: true,
            Name: true,
            Price: true,
        }
    });

    return res.json(items);

};

module.exports.getAllByBrand = async (req, res) => {

    const products = await prisma.products.findMany({
        where: {
            BrandName: req.params.brand
        },
        select: {
            BrandName: true,
            Name: true,
            Price: true
        }
    });

    if (products.length !== 0)
        return res.json(products);
    else
        throw new MyPrismaException(400, "Brand not found...");

};

module.exports.getSpecificProduct = async (req, res) => {

    const product = await prisma.products.findFirst({
        where: {
            Id: Number(req.params.product),
            BrandName: req.params.brand
        },
        select: {
            BrandName: true,
            Name: true,
            Description: true,
            Info: true,
            Price: true,
            Comments: {
                where: {
                    Stage: "ACCEPTED"
                },
                select: {
                    UserEmail: true,
                    Text: true,
                    Votes: {
                        select: {
                            UserEmail: true,
                            Type: true
                        }
                    }
                }
            }
        }
    });

    return res.json(product);

};