const express = require("express");

const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkAdminRole = require("../middlewares/checkAdminRole");

// Import Controller
const {
  addRestaurants,
  addRestaurantsMenu,
  editRestaurants,
  deleteRestaurants,
  getRestaurants,
  getRestaurantsMenu,
} = require("../controllers/restaurantsController");

// @route   POST restaurants/add
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.post("/add", checkAuthentication, checkAdminRole, addRestaurants);

// @route   GET restaurants
// @access  Public
// @middleware checkAuthentication
router.get("/", checkAuthentication, getRestaurants);

// @route   GET restaurants/:id/menus
// @access  Public
// @middleware checkAuthentication
router.get("/:id/menus", checkAuthentication, getRestaurantsMenu);

// @route   POST restaurants/:id/menus
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.post(
  "/:id/menus",
  checkAuthentication,
  checkAdminRole,
  addRestaurantsMenu
);

// @route   DELETE restaurants/:id
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.delete("/:id", checkAuthentication, checkAdminRole, deleteRestaurants);

// @route   PUT restaurants/:id
// @access  Private, Admin Only
// @middleware checkAuthentication, checkAdminRole
router.put("/:id", checkAuthentication, checkAdminRole, editRestaurants);

module.exports = router;
