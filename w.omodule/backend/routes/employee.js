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
      time_in,
      time_out,
      admin_assigned,
      employee_id,
      status
      
    } = req.body;
    const sql =
      'INSERT INTO tbl_employee_log (date, name, time_in, time_out, admin_assigned, employee_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sql,
      [ date,
        name,
        time_in,
        time_out,
        admin_assigned,
        employee_id,
        status,
      ],
      (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({
            id: results.insertId,
            date,
            name,
            time_in,
            time_out,
            admin_assigned,
            employee_id,
            status,
            
          });
        }
      }
    );
  });
  

  router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sql = `
      SELECT * FROM tbl_employee_log
      WHERE name LIKE ?`; 
  
    const params = [`%${searchTerm}%`];
  
    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }); 
  //update
  router.put('/:id', (req, res) => {
    const employeeLogId = req.params.id;
    const { time_out, status } = req.body;

    
    db.query(
        'UPDATE tbl_employee_log SET time_out = ?, status = ? WHERE id = ?',
        [time_out, status, employeeLogId],
        (err, updateResults) => {
            if (err) {
                console.error('Error updating employee log:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (updateResults.changedRows === 0) {
                res.status(404).json({ error: 'No changes made' });
                return;
            }

            res.json({
                id: employeeLogId,
                time_out: time_out,
                status: status,
                message: 'Employee log updated successfully',
            });
        }
    );
});


  


  // view
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tbl_employee_log', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
module.exports = router;