const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const path = require('path')
// Kết nối database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Bật chế độ SSL cho kết nối
  },
});

// API để lấy danh sách người dùng
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Use __dirname to get the absolute path
});
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
