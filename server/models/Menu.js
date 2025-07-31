const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  description: {
    type: String,
    default: "",
  },
  menuType: {
    type: String,
    enum: ["makanan", "minuman"],
    default: "makanan",
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
