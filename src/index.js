const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const userRoute = require("./routes/userRoute");
const rpsRoute = require("./routes/rpsRoute");

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(rpsRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("sendMessage", ({ room, sendMessage, username }) => {
    socket.join(room);
    io.to(room).emit("receiveMessage", { sendMessage, username });
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log("listening on port " + port);
});
