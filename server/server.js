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
const io = new Server(app, {
  cors: {
    origin: "*",
  },
});

let roomChat = "hihihi";
io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log("new client connected");
  let friend_id = "";
  //nhận id của friend
  socket.on("friend_id", (id) => {
    friend_id = id;
  });
  //nhận room từ client và join room
  socket.on("joinroom", (room) => {
    roomChat = room;
    socket.join(room);
    console.log("Received message from server ------Roomm:", roomChat);
  });

  socket.on("message", (data) => {
    let { room, message } = data;
    console.log("Received message from server:", room, "--------", message);
    socket.emit(friend_id, roomChat);
    socket.emit(roomChat, message);
  });

  // Gửi tin nhắn tới client
  // console.log("---------", resRoom);
  // socket.to(resRoom).emit( resMess);
  // socket.on('manh', message => {
  //   console.log('Received message from client:', message);
  // });
});

//use Thir-party middleware
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(express.static("public"));

//importRouter
const authRoutes = require("./Routes/auth.routes");
const userRoutes = require("./Routes/user.routes");
const { checkToken } = require("./Middleware/auth.middleware");
const { getDataMain } = require("./Models/main.model");

//Khai bao Router
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/user", userRoutes);
server.get("/", checkToken, getDataMain);
server.listen(8000, () => {
  console.log("server listen port : 8000");
});
app.listen(4000, () => {
  console.log("socket listen port : 4000");
});
