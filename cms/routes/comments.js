const express = require("express");
const router = express.Router();
const valid = require("../../middlewares/joi-validator");
const validator = require("../../models/check-comment-model");
const { cms } = require("../../middlewares/token-validator");
const { getAllComments, checkComment } = require("./controller/comments-controller");
const catchError = require("../../utilities/error-handler");

router.get("/", cms, catchError(getAllComments));

router.post("/check", [cms, valid(validator)], catchError(checkComment));


module.exports = router;