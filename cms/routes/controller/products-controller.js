const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

// todo: don't pass throw { code: 400, message: "Error occurred..." } every single time.

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
            throw { code: 400, message: "Brand already exists..." };
        else if (err.code === "P2003")
            throw { code: 403, message: "User not found..." };
        throw { code: 400, message: "Error occurred..." };
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
            throw { code: 400, message: "Brand not found" };
        throw { code: 400, message: "Error occurred..." };
    });

    return res.json(product);

};