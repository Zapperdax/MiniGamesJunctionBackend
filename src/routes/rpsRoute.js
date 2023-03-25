const express = require("express");
const router = new express.Router();
const RPS = require("../models/rpsModel");
const TENZIE = require("../models/tenziesModel");
const SIMON = require("../models/simonModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

router.post("/rps/highscore", auth, async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ "ERROR: ": "User Not Found" });
    }
    const highScore = req.body.highScore;
    const name = req.body.name;
    RPS.findOneAndUpdate(
      { email },
      { highScore, name },
      { upsert: true, new: true },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({
          message: "Successful",
          result,
        });
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/rps/allScores", async (req, res) => {
  try {
    const users = await RPS.find({}).sort({ highScore: -1 });
    if (users.length <= 0) {
      return res.status(404).send({ "ERROR : ": "No Users In Database" });
    }
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/tenzie/highscore", auth, async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ "ERROR: ": "User Not Found" });
    }
    const highScore = req.body.highScore;
    const name = req.body.name;
    TENZIE.findOneAndUpdate(
      { email },
      { highScore, name },
      { upsert: true, new: true },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({
          message: "Successful",
          result,
        });
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/tenzie/allScores", async (req, res) => {
  try {
    const users = await TENZIE.find({}).sort({ highScore: -1 });
    if (users.length <= 0) {
      return res.status(404).send({ "ERROR : ": "No Users In Database" });
    }
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/simon/highscore", auth, async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ "ERROR: ": "User Not Found" });
    }
    const highScore = req.body.highScore;
    const name = req.body.name;
    SIMON.findOneAndUpdate(
      { email },
      { highScore, name },
      { upsert: true, new: true },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({
          message: "Successful",
          result,
        });
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/simon/allScores", async (req, res) => {
  try {
    const users = await SIMON.find({}).sort({ highScore: -1 });
    if (users.length <= 0) {
      return res.status(404).send({ "ERROR : ": "No Users In Database" });
    }
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
