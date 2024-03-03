const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Zithara',
  password: 'satya156',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

// Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search customers by name or location
app.get('/api/customers/search', async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const { rows } = await pool.query('SELECT * FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1', [`%${searchTerm}%`]);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sort customers by date or time
app.get('/api/customers/sort', async (req, res) => {
  const { sortBy } = req.query;
  try {
    let query;
    if (sortBy === 'date') {
      query = 'SELECT *, DATE(created_at) AS created_date FROM customers ORDER BY created_date';
    } else if (sortBy === 'time') {
      query = 'SELECT *, CAST(created_at AS TIME) AS created_time FROM customers ORDER BY created_time';
    } else {
      return res.status(400).json({ error: 'Invalid sortBy parameter. Must be "date" or "time".' });
    }

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
