const mysql = require('mysql');

function newConnection()
{
    let connection = mysql.createConnection(
        {
            host: '35.224.127.168',
            user: 'root',
            password: 'doodleapp',
            database: 'doodle_DB'
        });
    return connection;
}

module.exports = {newConnection:newConnection};
