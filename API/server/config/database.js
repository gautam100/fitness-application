var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'imfit'
});

connection.connect(function (err){
    if (!err) {
        console.log("Database is connected ... ");
    } else {
        console.log('DB Connection Error ! ' + err);
    }
});

// connection.query('SELECT * from products order by id', function (err, rows, fields) {
//   if (err) throw err
//   console.log('The solution is: ', rows[1])
// })

module.exports = {
    connection: connection
}

// connection.end()
