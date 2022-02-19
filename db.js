var mysql = require('mysql');

db_config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'kcs_backend'
}

function handleDisconnected(err){
    if(err){
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            connect();
        }else{
            console.error(err.stack || err);
        }
    }
}

function connect () {
    db = mysql.createConnection(db_config);
    db.connect(handleDisconnected);
    db.on('error', handleDisconnected);
}

var db;
connect();

module.exports = db;