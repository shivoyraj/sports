const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6683533',
  password: 'V1zpWYgKky',
  database: 'sql6683533'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
