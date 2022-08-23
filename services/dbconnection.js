const mysql = require("mysql");


const userDB = "gpsarduinoprt.000webhostapp.com";
const hostDB = "gps_arduino";
const bdDB = "id19460382_gps_arduino_db";
const passwDB = "0p&Co-tKQ=QT3e(V";



// Connection DB
const conn = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwDB,
    database: bdDB
});

conn.connect();


module.exports = conn;