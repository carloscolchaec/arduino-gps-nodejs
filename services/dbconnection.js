const mysql = require("mysql");


const userDB = "root";
const hostDB = "localhost";
const bdDB = "walert_db";
const passwDB = "";



// Connection DB
const conn = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwDB,
    database: bdDB
});

conn.connect();


module.exports = conn;