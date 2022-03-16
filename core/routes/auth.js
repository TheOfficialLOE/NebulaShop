const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const validator = require("../../models/auth-model");
const validate = require("../../middleware/joi-validator");
const admin = require("../../middleware/admin-validator");

router.post("/register", [admin, validate(validator.registration)], async (req, res) => {

    await prisma.users.create({
        data: {
            Email: req.body.Email,
            Password: await bcrypt.hash(req.body.Password, await bcrypt.genSalt(10)),
            Role: req.isSuperAdmin ? "ADMIN" : "USER"
        }
    }).then(data => {

        const token = jwt.sign({
            Email: data.Email,
            IsAdmin: data.Role === "ADMIN"
        }, config.get("jwtPrivateKey"));

        return res.header("x-auth-token", token).send("User created!");

    }).catch(err => {
        if (err.code === "P2002")
            return res.send("Email in use...");
        return res.status(400).send("Error occurred...");
    });

});

router.post("/login", validate(validator.login), async (req, res) => {

    await prisma.users.findUnique({
        where: {
            Email: req.body.Email
        }
    }).then(data => {
        if (data !== null) {

            const validPass = bcrypt.compare(req.body.Password, data.Password);
            if (!validPass) return res.status(400).send("User not found...");

            const token = jwt.sign({
                Email: data.Email,
                IsAdmin: data.Role === "ADMIN"
            }, config.get("jwtPrivateKey"));

            return res.header("x-auth-token", token).send("Logged in!");

        }
        else {
            return res.status(400).send("User not found...")
        }
    }).catch(err => {
        return res.status(400).send(err);
    });
});


module.exports = router