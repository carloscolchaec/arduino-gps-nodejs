const mysql = require("mysql");


const userDB = "sql5514775";
const bdDB = "sql5514775";
const passwDB = "M7prz4qVvK";
const hostDB = "sql5.freesqldatabase.com";



// Connection DB
const conn = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwDB,
    database: bdDB,
    connectTimeout: 300
});

conn.connect();


module.exports = conn;