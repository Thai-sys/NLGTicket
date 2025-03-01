const express = require("express");
const router = express.Router();
const pool = require("../db");

// Đặt vé
router.post("/", (req, res) => {
  const { userId, movieId, seats } = req.body;
  pool.query(
    "INSERT INTO bookings (user_id, movie_id, seats) VALUES (?, ?, ?)",
    [userId, movieId, seats],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Đặt vé thành công!" });
    }
  );
});

module.exports = router;
