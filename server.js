const express = require("express");
const app = express();
var path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require("body-parser");
const conn = require("./services/dbconnection");
const session = require("express-session");
const AppError = require("./utils/appError");
const ErrorHandle = require("./utils/errorHandle");
const cors = require("cors");
const alerts = require("./routes/alerts");

// Configuración de los CORS
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};


app.use(express.static("."));
app.use(cors(corsOptions));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(alerts);


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(
  session({
    secret: "gps123",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/crear-cliente", function (req, res) {
  console.log(req.session.loggedin)
  if (req.session.loggedin == undefined) {
    let pathLogin = path.join(__dirname, "./client/login.html");
    res.sendFile(pathLogin);
  }  else {
    let pathIndex = path.join(__dirname, "./client/crear-cliente.html");
    res.sendFile(pathIndex);
  }
});


app.get("/", function (req, res) {
  console.log(req.session.loggedin)
  if (req.session.loggedin == undefined) {
    let pathLogin = path.join(__dirname, "./client/login.html");
    res.sendFile(pathLogin);
  }  else {
    let pathIndex = path.join(__dirname, "./client/index.html");
    res.sendFile(pathIndex);
  }
});

app.get("/login", function (req, res) {
  if (req.session.loggedin) {
    let pathLogin = path.join(__dirname, "./client/login.html");
    res.sendFile(pathLogin);
  }
});



app.get("/salir", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

app.get("/comprobar", function (request, response) {
  let { email, password } = request.query;
  if (email && password) {
    conn.query(
      `SELECT * FROM tb_accounts WHERE email_account = '${email}' AND password_account = '${password}'`,
      function (error, results, fields) {
        if (error) throw error;
        const result = Object.values(JSON.parse(JSON.stringify(results)));
        if (result.length === 0) {
          response.status(200).json({
            status: "failed",
          });
        }
        result.forEach((e) => {
          postLoginCheck(e.email_account);
        });
        function postLoginCheck(email) {
          if (result.length > 0) {
            request.session.loggedin = true;
            response.status(200).json({
              status: "success",
            });
          } 
          response.end();
        }
      }
    );
  } 
});

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on *:5000");
});

exports.io = io;
module.exports = app;
