const express = require("express");
const server = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
//Socket.io
const http = require("http");
const app = http.createServer(server);
const { Server } = require("socket.io");
const io = new Server(app);

io.on("connection", (socket) => {
  console.log("Cos user connect");
});
//use Thir-party middleware
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(express.static("public"));

//importRouter
const authRoutes = require("./Routes/auth.routes");

//Khai bao Router
server.use("/api/v1/auth", authRoutes);

// server.listen(8000, () => {
//   console.log("listen port : 8000");
// });
app.listen(4000, () => {
  console.log("listen port : 4000");
});
