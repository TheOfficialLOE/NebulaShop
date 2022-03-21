const express = require("express");
const main = require("../core/routes/main");
const cart = require("../core/routes/cart");
const comments = require("../core/routes/comments");
const authentication = require("../core/routes/auth");
const products = require("../cms/routes/products");
const purchases = require("../core/routes/purchases");

module.exports = (app) => {
    app.use(express.json());
    app.use("/products", main);
    app.use("/cart", cart);
    app.use("/comments", comments);
    app.use("/auth", authentication);
    app.use("/purchase", purchases);
    app.use("/cms", products);
};