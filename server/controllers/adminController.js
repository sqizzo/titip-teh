const User = require("../models/User");

const approveUser = async (req, res, next) => {
  const id = req.params;

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
      success: false,
      message: "User berhasil di-approve",
      data,
    });
  } catch (error) {
    next(error);
  }
};
