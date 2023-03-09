const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL);
