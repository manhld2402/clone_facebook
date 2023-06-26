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

let resRoom = "hihihi";
io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log("new client connected");
  socket.on("joinroom", (room) => {
    resRoom = room;
    socket.join(room);
    console.log("Received message from server ------Roomm:", resRoom);
  });
  socket.on("message", (data) => {
    let { room, message } = data;
    console.log("Received message from server:", room, "--------", message);
    socket.emit(resRoom, message);
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
const { checkToken } = require("./Middleware/auth.middleware");

//Khai bao Router
server.use("/api/v1/auth", authRoutes);
server.get("/", checkToken, (req, res) => {
  console.log("author----------", req.headers);
});
server.listen(8000, () => {
  console.log("server listen port : 8000");
});
app.listen(4000, () => {
  console.log("socket listen port : 4000");
});
