require("dotenv").config();

const mysql = require("mysql");


const userDB = process.env.USER_DB;
const hostDB = process.env.HOST_DB;
const bdDB = process.env.DATABASE_DB;
const passwDB = process.env.PASSWORD_DB;
const portDb = process.env.PORT_DB;

// Connection DB
const conn = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwDB,
    database: bdDB
});

conn.connect();


module.exports = conn;