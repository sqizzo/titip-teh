const express = require("express");
const router = express.Router();

// Import Middleware
const checkAuthentication = require("../middlewares/checkAuthentication");
const checkAdminRole = require("../middlewares/checkAdminRole");

// Import Controller
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

// @route   POST /orders
// @access  Private
router.post("/", checkAuthentication, createOrder);

// @route   GET /orders
// @access  Private
router.get("/", checkAuthentication, getUserOrders);

// @route   GET /orders/all
// @access  Private, Admin only
router.get("/all", checkAuthentication, checkAdminRole, getAllOrders);

// @route   GET /orders/:id
// @access  Private
router.get("/:id", checkAuthentication, getOrderById);

// @route   PATCH /orders/:id/status
// @access  Private, Admin only
router.patch("/:id/status", checkAuthentication, checkAdminRole, updateOrderStatus);

// @route   PATCH /orders/:id/cancel
// @access  Private
router.patch("/:id/cancel", checkAuthentication, cancelOrder);

module.exports = router;