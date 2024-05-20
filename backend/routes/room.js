const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_lkeylog',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);np
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

router.use(bodyParser.json());

// Create a new room
router.post('/', (req, res) => {
  const { room, location, status } = req.body;
  const sql = 'INSERT INTO tbl_rooms (room, location, status) VALUES (?, ?, ?)';

  db.query(sql, [room, location, status], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ id: results.insertId, room, location, status });
    }
  });
});

// View all rooms
router.get('/', (req, res) => {
  db.query('SELECT * FROM tbl_rooms', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});




router.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  const sql = `
    SELECT * FROM tbl_rooms
    WHERE room LIKE ?`; 

  const params = [`%${searchTerm}%`];

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.put('/:id', (req, res) => {
  const roomId = req.params.id;
  const {
      room,
      location,
      status
    } = req.body;

  db.query(
    'UPDATE tbl_rooms SET room = ?, location = ?, status = ? WHERE id = ?',
    [room,
      location,
      status,
       roomId],
    (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (results.changedRows === 0) {
          res.status(404).json({ error: 'Employee record not found' });
        } else {
          res.json({ id: roomId, message: 'Employee Log updated successfully' });
        }
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const roomId = req.params.id;
  db.query('DELETE FROM tbl_rooms WHERE id = ?', [roomId], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ id: roomId, message: 'User deleted successfully' });
    }
  });
});
module.exports = router;
