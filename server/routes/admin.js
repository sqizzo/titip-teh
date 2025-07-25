const express = require("express");

// Inisialisasi Router
const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkAdminRole = require("../middlewares/checkAdminRole");

// Import Controller
const { approveUser, rejectUser } = require("../controllers/adminController");
const { addMenu } = require("../controllers/menuController");

// @route   GET /admin/users/:id/approve
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.patch(
  "/users/:id/approve",
  checkAuthentication,
  checkAdminRole,
  approveUser
);

// @route   GET /admin/users/:id/reject
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.patch(
  "/users/:id/reject",
  checkAuthentication,
  checkAdminRole,
  rejectUser
);

// @route   POST /admin/menu/add
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.post("/menu/add", checkAuthentication, checkAdminRole, addMenu);

module.exports = router;
