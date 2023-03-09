const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("PLEASE AUTHENTICATE");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = auth;
