const express = require("express");

// Inisialisasi Router
const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkAdminRole = require("../middlewares/checkAdminRole");

// Import Controller
const { approveUser, rejectUser } = require("../controllers/adminController");

// @route   GET users/:id/approve
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.patch("/:id/approve", checkAuthentication, checkAdminRole, approveUser);

// @route   GET users/:id/reject
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.patch("/:id/reject", checkAuthentication, checkAdminRole, rejectUser);

module.exports = router;
