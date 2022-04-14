const express = require("express");
const router = express.Router();
const { hasToken } = require("../../middlewares/token-validator");
const catchError = require("../../utilities/error-handler");
const { newVote } = require("../controllers/vote-controller");

router.post("/:product/:comment", hasToken, catchError(newVote));

module.exports = router;