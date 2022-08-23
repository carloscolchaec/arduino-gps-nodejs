const mysql = require("mysql");


const userDB = "gps_arduino";
const hostDB = "gpsarduinoprt.000webhostapp.com";
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