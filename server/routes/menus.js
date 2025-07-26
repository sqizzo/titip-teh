const express = require("express");

const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkAdminRole = require("../middlewares/checkAdminRole");

// Import Controller
const {
  getAllMenus,
  removeMenu,
  editMenu,
  setStatusMenu,
} = require("../controllers/menuController.js");

// @route   GET /menus
// @access  Public
// @middleware checkAuthentication
router.get("/", checkAuthentication, getAllMenus);

// @route   DELETE /menus/id
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.delete("/:id", checkAuthentication, checkAdminRole, removeMenu);

// @route   PUT /menus/id
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.put("/:id", checkAuthentication, checkAdminRole, editMenu);

// @route   PATCH /menus/id
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.patch("/:id", checkAuthentication, checkAdminRole, setStatusMenu);

module.exports = router;
