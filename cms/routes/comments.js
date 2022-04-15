const express = require("express");
const router = express.Router();
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/check-comment-model");
const { cms } = require("../../middlewares/token-validator");
const { getAllComments, checkComment } = require("./controllers/comments-controller");
const catchError = require("../../utilities/error-handler");

router.get("/", cms, catchError(getAllComments));

router.post("/check", [cms, valid(validator)], catchError(checkComment));

// todo: Add more CRUD to this part and related parts.

module.exports = router;