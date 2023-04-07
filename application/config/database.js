const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    database: 'cs317db',
    password: 'Astra125'
    //debug: true,
});

const promisePool = pool.promise();

module.exports = promisePool;