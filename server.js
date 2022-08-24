const express = require("express");
const app = express();
var path = require('path')
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser')

const conn = require('./services/dbconnection')

const session = require('express-session');

const AppError = require("./utils/appError");
const ErrorHandle = require("./utils/errorHandle");

const cors = require('cors');

// Configuración de los CORS
const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}




// Importar las rutas activas
const router = require('./routes');
const alerts = require('./routes/alerts');



app.use(express.static("."));
app.use(cors(corsOptions))
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);
app.use(alerts);


// var add = io.of('/add');


// add.on('connection', function(socket){
//     io.emit('chat message', "ESTOY DESDE EL SOCKET");
//       console.log('socket test');
//     console.log(socket)
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.use(session({
	secret: 'gps123',
	resave: true,
	saveUninitialized: true
}))


app.get('/', function(req, res) {
  if (req.session.loggedin = true) {
    let pathIndex = path.join(__dirname, "./client/index.html");
    res.sendFile(pathIndex);
  } else {
    let pathLogin = path.join(__dirname, "./client/login.html");
    res.sendFile(pathLogin);
  }
})

app.get('/login', function(req, res) {
  if (req.session.loggedin = false) {
    let pathLogin = path.join(__dirname, "./client/login.html");
    res.sendFile(pathLogin);
  } else {
    let pathIndex = path.join(__dirname, "./client/index.html");
    res.sendFile(pathIndex);
  }
})

app.get('/salir', function(req, res) {
  req.session.destroy((err) => {
    res.redirect('/') 
  })
})

app.get('/comprobar', function(request, response) {
  let { email, password } = request.query;
    if (email && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        conn.query(`SELECT * FROM tb_accounts WHERE email_account = '${email}' AND password_account = '${password}'`, function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            const result = Object.values(JSON.parse(JSON.stringify(results)));
            result.forEach(e => {
              postLoginCheck(e.email_account)
            });
            // If the account exists
           function postLoginCheck(email) {
               if (result.length > 0) {
                  request.session.loggedin = true;
                  response.redirect('/');
              } else {
                  response.send('Incorrect Username and/or Password!');
              }			
              response.end();
           }
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});




server.listen(process.env.PORT || 5000, () => {
  console.log("listening on *:3000");
});

exports.io = io;
module.exports = app;