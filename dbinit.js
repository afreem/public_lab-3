const mysql = require('mysql');

let connection = mysql.createConnection(
    {
        host: '35.224.127.168',
        user: 'root',
        password: 'doodleapp',
        database: 'doodle_DB'
    }
);

connection.connect();

//To clear the table:
//connection.query("DROP Table Doodle");

connection.query(`
    CREATE TABLE Doodle (
        name varchar(20),
        days varchar(10),
        PRIMARY KEY(name)
    );
    `
    , (error, rows, fields) => {
        console.log(error);
        console.log("table created");
    });

connection.end();