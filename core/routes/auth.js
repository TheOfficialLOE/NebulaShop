const express = require("express");
const router = express.Router();
const validator = require("../../models/auth-model");
const validate = require("../../middlewares/joi-validator");
const { registerAdmin } = require("../../middlewares/token-validator");
const catchError = require("../../utilities/error-handler");
const { register, login } = require("../controllers/auth-controller");

router.post("/register", [registerAdmin, validate(validator.registration)], catchError(register));

router.post("/login", validate(validator.login), catchError(login));


module.exports = router;