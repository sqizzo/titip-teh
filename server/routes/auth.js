const express = require("express");

// Inisialisasi Router
const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");

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

// @route   GET /auth/profile
// @access  Private
// @middleware checkAuthentication
router.get("/profile", checkAuthentication, getProfile);

module.exports = router;
