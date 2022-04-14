const express = require("express");
const router = express.Router();
const { cms } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/products-model");
const { createBrand, createProduct } = require("./controller/products-controller");
const catchError = require("../../utilities/error-handler");

// todo: find a better name for joi validators

router.post("/newProduct", [cms, valid(validator.product)], catchError(createProduct));

router.post("/newBrand", [cms, valid(validator.brand)], catchError(createBrand));


module.exports = router