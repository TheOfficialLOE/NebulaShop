const express = require("express");
const router = express.Router();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/purchase-model");
const catchError = require("../../utilities/error-handler");
const { getAllPurchases, newPurchase } = require("../controllers/purchase-controller");

router.get("/", hasToken, catchError(getAllPurchases));

router.post("/buy", [hasToken, valid(validator)], catchError(newPurchase));

module.exports = router;