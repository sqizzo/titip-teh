const { default: mongoose } = require("mongoose");
const Menu = require("../models/Menu");

// @desc    Get semua menu
// @route   GET /menus
// @access  Public
const getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().populate("restaurant");

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan menu",
      menus,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove menu
// @route   DELETE menus/:id
// @access  Private, Admin-only
const removeMenu = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID menu tidak valid",
    });
  }

  try {
    const deleted = await Menu.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu berhasil dihapus",
      deleted,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Edit menu
// @route   PUT menus/:id
// @access  Private, Admin-only
const editMenu = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID menu tidak valid",
    });
  }

  try {
    const allowedFields = [
      "name",
      "price",
      "status",
      "description",
      "menuType",
    ];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const menu = await Menu.findByIdAndUpdate(id, updateData, { new: true });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil edit menu",
      menu,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Set status menu
// @route   PATCH menus/:id
// @access  Private, Admin-only
const setStatusMenu = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID menu tidak valid",
    });
  }

  try {
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    if (menu.status === "available") {
      menu.status = "unavailable";
    } else {
      menu.status = "available";
    }

    await menu.save();

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah status menu",
      menu,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMenus, removeMenu, editMenu, setStatusMenu };
