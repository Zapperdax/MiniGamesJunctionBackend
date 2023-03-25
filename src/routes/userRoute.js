const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");

///////////////////////////// Get Routes //////////////////////////

//get user details
router.get("/user/me", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/user/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length <= 0) {
      return res.status(404).send({ "ERROR: ": "No Users In Database" });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

///////////////////////////// Post Routes //////////////////////////
//signup
router.post("/newUser", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//login
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// logout
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
