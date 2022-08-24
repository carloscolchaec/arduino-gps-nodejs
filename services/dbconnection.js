const mysql = require("mysql");


const userDB = "4163335_gpsdb";
const hostDB = "185.176.43.109";
const bdDB = "4163335_gpsdb";
const passwDB = "gpsdb123";



// Connection DB
const conn = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwDB,
    database: bdDB
});

conn.connect();


module.exports = conn;