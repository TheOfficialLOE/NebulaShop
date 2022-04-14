const MyPrismaException = require("../utilities/MyPrismaException");

module.exports = action => (req, res, next) => action(req, res).catch(err => {
    if (err instanceof MyPrismaException)
        return res.status(err.code).json(err.message);
    return res.status(400).json("Error occurred...");
});