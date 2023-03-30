const mongoose = require("mongoose");

const loqModel = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  highScore: {
    type: Number,
  },
});

const LOQ = mongoose.model("LOQ", loqModel);
module.exports = LOQ;
