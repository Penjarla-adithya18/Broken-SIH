// API route definitions// Example Express routes (JSX extension for demonstration)

// Add route definitions hereimport express from 'express';

import pool from './db.jsx';
const router = express.Router();


// Users
router.get('/users', async (req, res) => {
  const result = await pool.query('SELECT id, username, role, created_at FROM users');
  res.json(result.rows);
});

// Trains
router.get('/trains', async (req, res) => {
  const result = await pool.query('SELECT * FROM trains');
  res.json(result.rows);
});

// Timetable
router.get('/timetable', async (req, res) => {
  const result = await pool.query('SELECT * FROM timetable');
  res.json(result.rows);
});

// Conflicts
router.get('/conflicts', async (req, res) => {
  const result = await pool.query('SELECT * FROM conflicts');
  res.json(result.rows);
});

// Logs
router.get('/logs', async (req, res) => {
  const result = await pool.query('SELECT * FROM logs');
  res.json(result.rows);
});

// Analytics
router.get('/analytics', async (req, res) => {
  const result = await pool.query('SELECT * FROM analytics');
  res.json(result.rows);
});

export default router;
