
const jwt = require("jsonwebtoken");
const config = require("config");

exports.registerAdmin = (req, res, next) => {

    const token = req.header("x-admin-token");
    if (!token) return next();

    try {

        const verified = jwt.verify(token, config.get("jwtPrivateKey"));
        if (verified.role === "SUPER_ADMIN") {
            req.isSuperAdmin = true
            return next();
        }
        else if (verified.role === "ADMIN") {
            req.isAdmin = true
            return next();
        }

    }catch (e) {
        return res.status(400).json("Invalid token...");
    }


}

exports.cms = (req, res, next) => {

    const token = req.header("x-admin-token");
    if (!token) return res.status(403).json("Not allowed...");

    try {

        const verified = jwt.verify(token, config.get("jwtPrivateKey"));
        if (verified.role === "SUPER_ADMIN" || verified.role === "ADMIN") {
            req.email = verified.email;
            return next();
        }
        else
            return res.status(403).json("Not allowed...");


    }catch (e) {
        return res.status(400).json("Invalid token...");
    }

}