const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;
const MyPrismaException = require("../../../utilities/MyPrismaException");

module.exports.createBrand = async (req, res) => {

    const brand = await prisma.brands.create({
        data: {
            Name: req.body.Name,
            BrandDetails: req.body.Details,
            CreatedBy: req.email
        },
        include: {
            Products: true
        }
    }).catch(err => {
        if (err.code === "P2002")
            throw new MyPrismaException(400, "Brand already exists...");
        else if (err.code === "P2003")
            throw new MyPrismaException(403, "User not found...");
    });

    return res.json(brand);


};

module.exports.createProduct = async (req, res) => {

    const product = await prisma.products.create({
       data: {
           Name: req.body.Name,
           Description: req.body.Description,
           Info: req.body.Info,
           BrandName: req.body.Brand,
           Remaining: req.body.Remaining,
           CreatedBy: req.email,
           Price: req.body.Price
       },
        include: {
            Purchases: true
        }
    }).catch(err => {
        if (err.code === "P2003")
            throw new MyPrismaException(400, "Brand not found");
    });

    return res.json(product);

};