var mysql = require('mysql');

db_config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'kcs_backend'
}

var connection;

function handleDisconnected(){
    connection = mysql.createConnection(db_config);
    connection.on("error", (err)=>{
        console.log('db error', err);
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            handleDisconnected();
        }else{
            throw err;
        }
    })
}

handleDisconnected();

module.exports = connection;