const helmet = require("helmet");
const errHandler = require("../middlewares/err-handler");
module.exports = app => {
    app.use(helmet());
    app.use(errHandler);
};