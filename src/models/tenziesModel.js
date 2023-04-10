const mongoose = require("mongoose");

const tenziesModel = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  highScore: {
    type: String,
  },
});

const TENZIE = mongoose.model("TENZIE", tenziesModel);
module.exports = TENZIE;
