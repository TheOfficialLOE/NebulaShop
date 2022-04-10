
// todo: clean this garbage.

const express = require("express");
const main = require("../core/routes/main");
const cart = require("../core/routes/cart");
const comments = require("../core/routes/comments");
const vote = require("../core/routes/vote");
const authentication = require("../core/routes/auth");
const products = require("../cms/routes/products");
const checkComments = require("../cms/routes/comments");
const purchases = require("../core/routes/purchases");

module.exports = (app) => {
    app.use(express.json());
    app.use("/products", main);
    app.use("/cart", cart);
    app.use("/comments", comments);
    app.use("/vote", vote);
    app.use("/auth", authentication);
    app.use("/purchase", purchases);
    app.use("/cms", products);
    app.use("/cms/comments/", checkComments);
};