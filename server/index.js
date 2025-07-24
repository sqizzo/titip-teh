require("dotenv").config();
// Import Basic
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");

// Import Routes
const auth = require("./routes/auth");

// Initialize port
const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();

// Pake passport buat auth
app.use(passport.initialize());
require("./config/passport")(passport);

// Pake cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Pake morgan buat logging
app.use(morgan("tiny"));

// Biar bisa baca json dari FE
app.use(express.json());

// Biar cookie disimpen
app.use(cookieParser());

// Routes
app.use("/auth", auth);

// Check base url
app.get("/", (req, res) => {
  res.send("Titip Teh API ready!");
});

// Catch error kalau udah mumet pol
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message ?? "Internal Server Error",
  });
});

// Start MongoDB and Server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("--- Server Started ---");
    console.log("Connection to MongoDB was successfully established");
    app.listen(PORT, () => {
      console.log(
        `Server running on: http://${process.env.HOSTNAME}:${process.env.PORT}
Client running on: http://${process.env.CLIENT_URL}`
      );
      console.log("---- Logger ----");
    });
  })
  .catch((err) => {
    console.log("Connection to MongoDB was unsuccessful with error: ", err);
  });
