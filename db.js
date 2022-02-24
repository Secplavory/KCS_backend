var mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

db_config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'kcs_backend'
}

const pool = mysql.createPool(db_config)

module.exports = {
    getConnection: (callback) => {
        pool.getConnection(callback)
    }
}
