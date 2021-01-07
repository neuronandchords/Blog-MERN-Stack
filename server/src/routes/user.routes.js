const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");

const { getuserById, getUser } = require("../controllers/user.controller");
router.param("userId", getuserById);
//Routes
router.get("/api/user/:userId", isSignedIn, isAuthenticated, getUser);

//Export
module.exports = router;
