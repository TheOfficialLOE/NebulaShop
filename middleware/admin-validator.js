
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {

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
        return res.status(400).send("Invalid token...");
    }


}