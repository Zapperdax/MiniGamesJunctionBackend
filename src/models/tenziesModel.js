const mongoose = require("mongoose");

const tenziesModel = new mongoose.Schema({
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

const TENZIE = mongoose.model("TENZIE", tenziesModel);
module.exports = TENZIE;
