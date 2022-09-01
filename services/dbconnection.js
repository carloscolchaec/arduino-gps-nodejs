const mysql = require("mysql");


// const userDB = "sql5514775"; 
// const bdDB = "sql5514775";
// const passwDB = "M7prz4qVvK";
// const hostDB = "sql5.freesqldatabase.com";


const userDB = "sql10516525"; 
const bdDB = "sql10516525";
const passwDB = "KF24ZZgj6I";
const hostDB = "sql10.freemysqlhosting.net";



// const userDB = "root";
// const bdDB = "walert_db";
// const passwDB = "";
// const hostDB = "localhost";

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