const mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 's2w1d1e0v5p0r3ac',
    database: 'carRental'
});

module.exports = connection;