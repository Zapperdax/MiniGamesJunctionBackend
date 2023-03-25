const mongoose = require("mongoose");

const simonModel = new mongoose.Schema({
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

const SIMON = mongoose.model("SIMON", simonModel);
module.exports = SIMON;
