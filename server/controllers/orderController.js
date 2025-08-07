const mongoose = require("mongoose");
const Order = require("../models/Orders");
const Menu = require("../models/Menu");

// @desc    Create new order
// @route   POST /orders
// @access  Private
const createOrder = async (req, res, next) => {
  const { items, notes } = req.body;
  const userId = req.user._id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items order tidak boleh kosong",
    });
  }

  try {
    let totalPrice = 0;
    const orderItems = [];

    // Validate and calculate total price
    for (const item of items) {
      const menu = await Menu.findById(item.menuId);
      if (!menu) {
        return res.status(404).json({
          success: false,
          message: `Menu dengan ID ${item.menuId} tidak ditemukan`,
        });
      }

      if (menu.status !== "available") {
        return res.status(400).json({
          success: false,
          message: `Menu ${menu.name} sedang tidak tersedia`,
        });
      }

      const itemTotal = menu.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        menu: menu._id,
        quantity: item.quantity,
        price: menu.price,
      });
    }

    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      notes: notes || "",
    });

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("user", "name email")
      .populate("items.menu", "name price restaurant")
      .populate("items.menu.restaurant", "name");

    res.status(201).json({
      success: true,
      message: "Order berhasil dibuat",
      order: populatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /orders
// @access  Private
const getUserOrders = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId })
      .populate("items.menu", "name price restaurant")
      .populate("items.menu.restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan orders",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /orders/all
// @access  Private, Admin only
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menu", "name price restaurant")
      .populate("items.menu.restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua orders",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /orders/:id/status
// @access  Private, Admin only
const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID order tidak valid",
    });
  }

  const validStatuses = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status tidak valid",
    });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.menu", "name price restaurant")
      .populate("items.menu.restaurant", "name");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status order berhasil diupdate",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID order tidak valid",
    });
  }

  try {
    let query = { _id: id };
    
    // If not admin, only show user's own orders
    if (userRole !== "admin") {
      query.user = userId;
    }

    const order = await Order.findOne(query)
      .populate("user", "name email")
      .populate("items.menu", "name price restaurant")
      .populate("items.menu.restaurant", "name");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan order",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PATCH /orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID order tidak valid",
    });
  }

  try {
    const order = await Order.findOne({ _id: id, user: userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Order tidak dapat dibatalkan",
      });
    }

    order.status = "cancelled";
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.menu", "name price restaurant")
      .populate("items.menu.restaurant", "name");

    res.status(200).json({
      success: true,
      message: "Order berhasil dibatalkan",
      order: populatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  cancelOrder,
};