const express = require("express");
const router = express.Router();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/cart-model");
const catchError = require("../../utilities/error-handler");
const { getAllCartItems, addToCart } = require("../controllers/cart-controller");

router.get("/", hasToken, catchError(getAllCartItems));

router.post("/add", [hasToken, valid(validator)], catchError(addToCart));


module.exports = router;