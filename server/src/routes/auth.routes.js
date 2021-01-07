//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signin } = require("../controllers/auth.controller");

router.post(
  "/signup",
  [
    check("username", "name must be atleast 3 char").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email field is required").isEmail(),
    check("password", "password field is required").isLength({ min: 3 }),
  ],
  signin
);

module.exports = router;
