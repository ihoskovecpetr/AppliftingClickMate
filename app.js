const express = require("express");
const http = require("http");
var path = require("path");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);
const indexRouter = require("./routes");

app.use(express.static(path.join(__dirname, "build")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//setting up sockets
connections = [];
clients = {};

io.sockets.on("connection", function (socket) {
  // connections.push(socket);
  clients[socket.id] = socket;
  console.log(
    "Connected: % sockets connected",
    Object.keys(clients).length,
    socket.id
  );

  socket.on("disconnect", () => {
    console.log("user disconnected", socket);
    delete clients[socket.id];
  });

  socket.on("click", () => {
    console.log("new on server");
    socket.emit("hello", "can you hear me?", 1, 2, "abc");
    io.sockets.emit("clicked", { msg: e });
  });
});

// Make io accessible to our router
app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use("/api", indexRouter);

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/:team", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0-cwrxi.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    const PORT = process.env.PORT || 4005;
    server.listen(PORT, () => {
      console.log(
        `Connected: SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = io;

// const PORT = process.env.PORT || 4005;
// httpServer.listen(PORT, () => {
//         console.log(`SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `);
//       })
