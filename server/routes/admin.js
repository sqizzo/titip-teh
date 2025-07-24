const express = require("express");

// Inisialisasi Router
const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkAdminRole = require("../middlewares/checkAdminRole");

// Import Controller
const { approveUser, rejectUser } = require("../controllers/adminController");

router.patch(
  "/users/:id/approve",
  checkAuthentication,
  checkAdminRole,
  approveUser
);

router.patch(
  "/users/:id/reject",
  checkAuthentication,
  checkAdminRole,
  rejectUser
);

module.exports = router;
