const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const userRoute = require("./routes/userRoute");

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("sendMessage", ({ sendMessage }) => {
    socket.broadcast.emit("receiveMessage", { sendMessage });
    // socket.room(123).emit()
  });
});

server.listen(port, () => {
  console.log("listening on port " + port);
});
