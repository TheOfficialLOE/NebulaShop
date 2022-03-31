
const jwt = require("jsonwebtoken");
const config = require("config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

            checkUser(verified.email)
                .then(count => {
                    if (count === 0) {
                        return res.status(400).json("User not found...");
                    }
                    else {
                        req.email = verified.email;
                        return next();
                    }
                });
        }
        else
            return res.status(403).json("Not allowed...");


    }catch (e) {
        return res.status(400).json("Invalid token...");
    }

}

exports.hasToken = (req, res, next) => {

    const token = req.header("x-auth-token");
    if (!token) return res.status(403).json("You have to login first...");

    try {

        const verified = jwt.verify(token, config.get("jwtPrivateKey"));

        checkUser(verified.email)
            .then(count => {
                if (count === 0) {
                    return res.status(400).json("User not found...");
                }
                else {
                    req.email = verified.email;
                    return next();
                }
            });


    }catch (e) {
        return res.status(400).json("Invalid token...");
    }

};

const checkUser = async (email) => {
  return await prisma.users.count({
      where: {
          Email: email
      }
  }).then(data => {
      return data
  });
};