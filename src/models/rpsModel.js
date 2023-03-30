const mongoose = require("mongoose");

const rpsModel = new mongoose.Schema({
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

const RPS = mongoose.model("RPS", rpsModel);
module.exports = RPS;
