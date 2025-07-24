const User = require("../models/User");

const approveUser = async (req, res, next) => {
  const id = req.params.id;

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

const rejectUser = async (req, res, next) => {
  const id = req.params.id;

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

module.exports = { approveUser, rejectUser };
