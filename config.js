const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$AnnaPassword11122019",
  database: "music",
});
 
module.exports = connection;

//connection = query the database
