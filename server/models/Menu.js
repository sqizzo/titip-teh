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
  },
});

module.exports = mongoose.model({ menuSchema });
