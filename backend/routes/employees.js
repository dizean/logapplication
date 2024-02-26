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
      name,
      classification,
      department,
      status,
      work_status
    } = req.body;
    const sql =
      'INSERT INTO tbl_employees ( name, classification, department, status, work_status) VALUES (?, ?, ?, ?, ?)';
    db.query(
      sql,
      [  name,
        classification,
        department,
        status,
        work_status],
      (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({
            id: results.insertId,
            name,
            classification,
            department,
            status,
            work_status
          });
        }
      }
    );
  });
  

  router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sql = `
      SELECT * FROM tbl_employees
      WHERE name LIKE ?`; 
  
    const params = [`%${searchTerm}%`];
  
    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }); 
  //update
  router.put('/:id', (req, res) => {
    const employeeid = req.params.id;
    const {
        name,
        classification,
        department,
        status,
        work_status
      } = req.body;
  
    db.query(
      'UPDATE tbl_employees SET name = ?, classification=?, department = ?, status = ?, work_status = ? WHERE id = ?',
      [name, classification, department, status, work_status, employeeid],
      (err, results) => {
        if (err) {
          console.error('Error updating data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          if (results.changedRows === 0) {
            res.status(404).json({ error: 'Employee record not found' });
          } else {
            res.json({ id: employeeid, message: 'Employee Log updated successfully' });
          }
        }
      }
    );
  });
  
  router.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sql = `
      SELECT * FROM tbl_employees
      WHERE name LIKE ?`; 
  
    const params = [`%${searchTerm}%`];
  
    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }); 

  // view
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tbl_employees', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  router.delete('/:id', (req, res) => {
    const employeeid = req.params.id;
    db.query('DELETE FROM tbl_employees WHERE id = ?', [employeeid], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ id: employeeid, message: 'User deleted successfully' });
      }
    });
  });
module.exports = router;