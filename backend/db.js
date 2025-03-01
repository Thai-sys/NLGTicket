const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aot",
  waitForConnections: true,  // Đợi khi hết kết nối thay vì báo lỗi
  connectionLimit: 10,       // Giới hạn tối đa 10 kết nối cùng lúc
  queueLimit: 0              // Không giới hạn hàng đợi
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL Pool Connected...");
    connection.release(); // Trả lại kết nối vào pool
  }
});

module.exports = pool;
