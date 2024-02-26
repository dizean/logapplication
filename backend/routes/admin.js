const express = require('express');
const router = express.Router();
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); 

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_lkeylog',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

router.use(bodyParser.json());

// newuser
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const sql = 'INSERT INTO tbl_admin (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId, username });
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// view
router.get('/', (req, res) => {
  db.query('SELECT * FROM tbl_admin', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM tbl_admin WHERE username = ?';

  db.query(sql, [username], async (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
