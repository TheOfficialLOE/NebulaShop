const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const MyPrismaException = require("../../utilities/MyPrismaException");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.register = async (req, res) => {

    const user = await prisma.users.create({
        data: {
            Email: req.body.Email,
            Password: await bcrypt.hash(req.body.Password, await bcrypt.genSalt(10)),
            Role: req.isSuperAdmin ? "ADMIN" : "USER"
        }
    }).catch(err => {
        if (err.code === "P2002")
            throw new MyPrismaException(400, "User already exists...");
    });

    const token = await jwt.sign({
        email: user.Email,
        role: user.Role
    }, config.get("jwtPrivateKey"));

    return res.header("x-auth-token", token).json("User created!");

};

module.exports.login = async (req, res) => {

    const user = await prisma.users.findUnique({
        where: {
            Email: req.body.Email
        }
    });

    if (user !== null) {

        const validPass = await bcrypt.compare(req.body.Password, user.Password);
        if (!validPass) return res.status(400).json("User not found...");

        const token = jwt.sign({
            email: user.Email,
            role: user.Role
        }, config.get("jwtPrivateKey"));

        return res.header("x-auth-token", token).json("Logged in!");

    }
    else {
        throw new MyPrismaException(400, "User not found...");
    }

};