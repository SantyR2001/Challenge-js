const mysql = require('mysql');


//mysql database connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'dbprueba'
});

//connection check
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!')
});

module.exports = connection;