const AppError = require("../utils/appError");
const conn = require("../services/dbconnection");
const app = require('../server')
const session = require("express-session");

session({
	secret: 'gps123',
	resave: true,
	saveUninitialized: true
})

var path = require("path");
// Hello API - Message API
exports.Dashboard = (req, res, next) => {
    let pathIndex = path.join(__dirname, "../client/index.html");
    res.sendFile(pathIndex);

};

exports.Login = (req, res, next) => {
  let pathIndex = path.join(__dirname, "../client/login.html");
  res.sendFile(pathIndex);
};
