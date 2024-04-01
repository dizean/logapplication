const express = require('express');
const router= express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

  // Create a new booking record
router.post('/', (req, res) => {
    const {
      date,
      name,
      purpose,
      place,
      time_in,
      time_out,
      gate,
      admin_assigned
    } = req.body;
    const sql =
      'INSERT INTO tbl_visitors (date, name, purpose, place, time_in, time_out, gate, admin_assigned) VALUES (?,?, ?, ?,?, ?, ?,?)';
    db.query(
      sql,
      [ date,
        name,
        purpose,
        place,
        time_in,
        time_out,
        gate,
        admin_assigned],
      (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({
            id: results.insertId,
            date,
            name,
            purpose,
            place,
            time_in,
            time_out,
            gate,
            admin_assigned
          });
        }
      }
    );
  });
  router.put('/:id', (req, res) => {
    const visitorid = req.params.id;
    const { date, name, purpose, place, time_in, time_out, gate, admin_assigned } = req.body;
  
    // Prepare the SQL statement with placeholders
    const sql = `UPDATE tbl_visitors SET date = ?, name = ?, purpose = ?, place = ?, time_in = ?, time_out = ?, gate = ?, admin_assigned = ? WHERE id = ?`;
  
    // Prepare the statement with parameter binding
    db.query(sql, [date, name, purpose, place, time_in, time_out, gate, admin_assigned, visitorid], (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Visitor record not found' });
        } else {
          res.json({ id: visitorid, message: 'Visitor record updated successfully' });
        }
      }
    });
  });
  
  

  router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sql = `
      SELECT * FROM tbl_visitors
      WHERE name LIKE ?`; 
  
    const params = [`%${searchTerm}%`];
  
    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }); 
//   router.put('/:id', (req, res) => {
//     const visitid = req.params.id;
//     const { room_id, booked_date, booker_name, from_time_in, until_time_in, status, admin_assigned } = req.body;
  
//     db.query(
//       'UPDATE tbl_booking SET room_id = ?, booked_date = ?, booker_name = ?, from_time_in = ?, until_time_in = ?, status = ?, admin_assigned = ? WHERE id = ?',
//       [room_id, booked_date, booker_name, from_time_in, until_time_in, status, admin_assigned, bookingId],
//       (err, results) => {
//         if (err) {
//           console.error('Error updating data:', err);
//           res.status(500).send('Internal Server Error');
//         } else {
//           if (results.changedRows === 0) {
//             res.status(404).json({ error: 'Booking record not found' });
//           } else {
//             res.json({ id: bookingId, message: 'Booking record updated successfully' });
//           }
//         }
//       }
//     );
//   });
  


  // get all
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tbl_visitors', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
module.exports = router;