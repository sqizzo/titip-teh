const mongoose = require("mongoose");
const User = require("../models/User");

// @desc    Approve akun
// @route   PATCH /admin/users/:id/approve
// @access  Private, Admin-only
const approveUser = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID tidak valid",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    if (user.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "User sudah di-approve",
      });
    }

    user.status = "approved";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User berhasil di-approve",
      user: {
        id: user._id,
        name: user.name,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject akun
// @route   PATCH /admin/users/:id/reject
// @access  Private, Admin-only
const rejectUser = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID tidak valid",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    if (user.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "User sudah ter-approve",
      });
    }

    user.status = "rejected";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User berhasil di-reject",
      user: {
        id: user._id,
        name: user.name,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get semua user
// @route   GET /admin/users
// @access  Private, Admin-only
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    ); // jangan kirim password
    res.status(200).json({
      success: true,
      users: users.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
      })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { approveUser, rejectUser, getAllUsers };
