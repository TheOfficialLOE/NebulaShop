const express = require("express");
const router  = express.Router();
const { hasToken } = require("../../middlewares/token-validator");
const valid = require("../../middlewares/joi-validator");
const validate = require("../../models/comment-model");
const catchError = require("../../utilities/error-handler");
const { newComment } = require("../controllers/comment-controller");

router.post("/new", [hasToken, valid(validate)], catchError(newComment));

module.exports = router;