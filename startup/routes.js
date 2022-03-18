const express = require("express");
const main = require("../core/routes/main");
const cart = require("../core/routes/cart");
const authentication = require("../core/routes/auth");
const products = require("../cms/routes/products");

module.exports = (app) => {
    app.use(express.json());
    app.use("/products", main);
    app.use("/cart", cart);
    app.use("/auth", authentication);
    app.use("/cms", products);
};