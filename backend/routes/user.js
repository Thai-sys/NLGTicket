const express = require("express");
const router = express.Router();
const pool = require("../db"); 

// Lấy danh sách người dùng
router.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Cập nhật thông tin người dùng
router.put("/update", (req, res) => {
  const { id, username, email } = req.body;
  pool.query(
    "UPDATE users SET username = ?, email = ? WHERE id = ?",
    [username, email, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Cập nhật thành công!" });
    }
  );
});

module.exports = router;
