// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'capstone',
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    pool.query(
      'SELECT * FROM users WHERE email = ? AND passWord = ?', // Update passWord to match your database schema
      [email, password],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }
  
        if (results.length === 0) {
          res.status(401).json({ message: 'Invalid credentials' });
        } else {
          res.status(200).json({ message: 'Login successful', user: results[0] });
        }
      }
    );
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
