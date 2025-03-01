const express = require("express");
const router = express.Router();
const pool = require("../db");

// Lấy danh sách phim
router.get("/get_list", (req, res) => {
  console.log('Request received for /get_list');  // Ghi lại khi có yêu cầu đến API

  pool.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      console.error('Database query failed: ', err);  // Ghi lỗi chi tiết
      return res.status(500).json({ error: err.message });  // Trả lỗi về client
    }
    console.log('Query successful, sending results');  // Ghi lại khi query thành công
    res.json(results);  // Trả về dữ liệu dưới dạng JSON
  });
});

module.exports = router;
