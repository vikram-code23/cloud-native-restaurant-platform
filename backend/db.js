const mysql = require("mysql2");

const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,

    waitForConnections: true,
    connectionLimit: 10

});

// TEST CONNECTION

pool.getConnection((err, connection) => {

    if (err) {

        console.log("❌ MySQL Connection Error");
        console.log(err);

    }

    else {

        console.log("✅ MySQL Connected");

        connection.release();

    }

});

module.exports = pool;