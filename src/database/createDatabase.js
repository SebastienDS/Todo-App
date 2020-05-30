const mysql = require('mysql');

const config = require('./config.js');


const createDatabase = function (name, callback) {
    con.query(`CREATE DATABASE if not exists ??`, [name], err => {
        if (err) throw err;

        console.log("Database created");
        callback();
    });
}

const createTables = function () {
    const db = mysql.createConnection(config);
    
    db.connect(err => {
        if (err) throw err;

        db.query(`create table if not exists Posts (
            id int primary key auto_increment,
            content varchar(50),
            checked boolean)`, err => {
            if (err) throw err;
            
            console.log("Table Posts created");
        });
        db.end();
    });
}


const con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});

con.connect((err) => {
    if (err) throw err;

    createDatabase(config.database, createTables);
    con.end();
});