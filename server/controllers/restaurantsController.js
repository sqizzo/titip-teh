const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurants");
const Menu = require("../models/Menu");

// @desc    Tambah Restoran
// @route   POST /restaurants/menu
// @access  Private, Admin-only
const addRestaurants = async (req, res, next) => {
  const { name, contact, address } = req.body;

  try {
    const restaurant = await Restaurant.findOne({ name });

    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restoran sudah ada",
      });
    }

    const newResto = await Restaurant.create({
      name,
      contact,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan restoran",
      restaurant: {
        id: newResto._id,
        name: newResto.name,
        contact: newResto.contact,
        address: newResto.address,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Tambah menu restoran
// @route   POST /restaurants/:id/menu
// @access  Private, Admin-only
const addRestaurantsMenu = async (req, res, next) => {
  const { name, price, status, description, menuType } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID restoran tidak valid",
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Nama menu diperlukan",
    });
  }

  try {
    const isExist = await Menu.find({ name, restaurant: id });

    if (isExist.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Menu sudah ada di restoran tersebut",
      });
    }

    const newMenu = await Menu.create({
      name,
      price,
      status,
      description,
      restaurant: id,
      menuType,
    });

    return res.status(201).json({
      success: true,
      message: "Menu berhasil ditambahkan",
      menu: {
        id: newMenu._id,
        name: newMenu.name,
        status: newMenu.status,
        description: newMenu.description,
        restaurant: newMenu.restaurant,
        menuType: newMenu.menuType,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete restaurants
// @route   DELETE /restaurants/:id
// @access  Private, Admin-only
const deleteRestaurants = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID restoran tidak valid",
    });
  }

  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restoran tidak ditemukan",
      });
    }

    await Menu.deleteMany({ restaurant: id });

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restoran berhasil di delete",
      restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Edit restoran
// @route   PUT /restaurants/:id
// @access  Private, Admin-only
const editRestaurants = async (req, res, next) => {
  const { id } = req.params;

  const { name, contact, address } = req.body;

  if (!name || !contact || !address) {
    return res.status(400).json({
      success: false,
      message: "Field restoran wajib diisi",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID tidak valid",
    });
  }

  try {
    const updateData = {
      ...req.body,
    };

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({
        success: false,
        message: "Restoran tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data restoran berhasil di-update",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all restaurants
// @route   GET /restaurants
// @access  Public
const getRestaurants = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find();

    res.status(201).json({
      success: true,
      message: "Berhasil mencari restoran",
      restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get restaurants menu
// @route   GET /restaurants/:id/menus
// @access  Public
const getRestaurantsMenu = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID restoran tidak valid",
    });
  }

  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant)
      return res.status(400).json({
        success: false,
        message: "Restoran tidak ditemukan",
      });

    const menus = await Menu.find({ restaurant: id }).populate(
      "restaurant",
      "name"
    );

    res.status(200).json({
      success: true,
      message: "Menu restoran berhasil diambil",
      menu: menus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRestaurants,
  addRestaurantsMenu,
  editRestaurants,
  deleteRestaurants,
  getRestaurants,
  getRestaurantsMenu,
};
