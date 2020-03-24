const Sequelize = require('sequelize');

sequelize = new Sequelize("MoviesClub", "root", "1234", {
    'host': "127.0.0.1",
    'dialect': "mysql",
    'port': "3306",
    'logging': false
})

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;

// const mysql = require('mysql2');

// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'MoviesClub',
//     port: 3306
// });

// // simple query
// connection.query(
//     "SELECT * FROM `genres` WHERE  `name` = 'Action' ",
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//         console.log(err);
//     }
// );