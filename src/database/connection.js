const mysql = require('mysql');

const config = require('./config.js');

const db = mysql.createConnection(config);

db.connect(err => {
    if (err) throw err;

    console.log('Connection established');
})

module.exports = db;