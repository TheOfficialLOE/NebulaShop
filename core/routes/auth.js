const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const validator = require("../../models/auth-model");
const validate = require("../../middlewares/joi-validator");
const { registerAdmin } = require("../../middlewares/token-validator");
const { create, findUnique } = require("../../utilities/query-builder");

router.post("/register", [registerAdmin, validate(validator.registration)], async (req, res) => {


    const user = await create(prisma.users, {
        Email: req.body.Email,
        Password: await bcrypt.hash(req.body.Password, await bcrypt.genSalt(10)),
        Role: req.isSuperAdmin ? "ADMIN" : "USER"
    });

    if (user.success) {
        const token = await jwt.sign({
            email: user.data.Email,
            role: user.data.Role
        }, config.get("jwtPrivateKey"));

        return res.header("x-auth-token", token).json("User created!");
    }
    else {
        if (user.data.code === "P2002")
            return res.status(400).json("User already exists...");
        return res.status(400).json("Error occurred...");
    }

});

router.post("/login", validate(validator.login), async (req, res) => {

    const user = await findUnique(prisma.users, {
        Email: req.body.Email
    });

    if (user.success && user.data !== null) {

        const validPass = await bcrypt.compare(req.body.Password, user.data.Password);
        if (!validPass) return res.status(400).json("User not found...");

        const token = jwt.sign({
            email: user.data.Email,
            role: user.data.Role
        }, config.get("jwtPrivateKey"));

        return res.header("x-auth-token", token).json("Logged in!");
    }
    else {
        if (user.data === null)
            return res.status(400).json("User not found...");
        return res.status(400).json("Error occurred...")
    }
});


module.exports = router;