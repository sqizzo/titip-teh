const express = require("express");
const passport = require("passport");

// Inisialisasi Router
const router = express.Router();

// Import Controller
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

// @route POST /auth/register
router.post("/register", register);

// @route POST /auth/login
router.post("/login", login);

// @route   GET /api/auth/profile
// @access  Private
// @middleware passport.authenticate("jwt")
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

module.exports = router;
