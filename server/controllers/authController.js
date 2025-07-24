// Models
const User = require("../models/User");

// Utils
const generateToken = require("../utils/generateToken");

// @desc    Register akun
// @route   POST /auth/register
// @access  Public
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Field request tidak lengkap",
    });
  }

  try {
    const isUserExist = await User.findOne({ email });

    // Check apakah udah ada user dengan email yang sama
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar!",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login akun
// @route   POST /auth/login
// @access  Public
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email/password salah",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Email/password salah",
      });
    }

    if (user.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Akun belum ter-approve",
      });
    }

    const token = generateToken(user);

    // Simpan token di cookie (ga lewat response, nanti FE akses cookie nya)
    res
      //   .cookie("token", token, {
      //     httpOnly: true,
      //     secure: process.env.NODE_ENV === "production",
      //     sameSite: "strict",
      //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      //   })
      .json({
        success: true,
        message: "Login berhasil",
        // buat di development aja
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data user",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getProfile };
