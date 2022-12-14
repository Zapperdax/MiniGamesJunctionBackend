const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const userRoute = require("./routes/userRoute");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRoute);

app.listen(port, () => {
  console.log("listening on port" + port);
});
