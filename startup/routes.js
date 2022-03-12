const express = require("express");
const authentication = require("../core/routes/auth");
const products = require("../cms/routes/products");

module.exports = (app) => {
    app.use(express.json());
    app.use("/", authentication);
    app.use("/cms", products);
};