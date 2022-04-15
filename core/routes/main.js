const express = require("express");
const router = express.Router();
const catchError = require("../../utilities/error-handler");
const { getAllProducts, search, getAllByBrand, getSpecificProduct } = require("../controllers/main-controller");

// todo: Add discount for products
// todo: add admin checker middlewares in startup routes

router.get("/", catchError(getAllProducts));

router.get("/search", catchError(search));

router.get("/:brand", catchError(getAllByBrand));

router.get("/:brand/:product", catchError(getSpecificProduct));

module.exports = router;