const express = require("express");
const router = express.Router();
const pool = require("../db").promise();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const verifyToken = require("./authMiddleware");
router.use(cookieParser());

const SECRET_KEY = "your_secret_key"; // Thay bằng key bảo mật thực tế

router.get("/", async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE role != 'admin'"
    );
    res.json(users);
  } catch (error) {
    console.error("[ERROR] Lỗi khi truy vấn CSDL:", error);
    res.status(500).json({
      message: "Lỗi máy chủ! Không thể lấy danh sách người dùng.",
      error: error.message,
    });
  }
});

// Đăng ký người dùng
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const avatar = "default.jpg"; // Mặc định ảnh đại diện

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin!" });
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email đã được sử dụng!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password, phone, avatar) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, avatar]
    );

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err);
    res.status(500).json({ error: "Lỗi server, vui lòng thử lại!" });
  }
});

// API kiểm tra email
router.get("/check-email", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email không được để trống." });
  }

  const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  pool.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Lỗi kiểm tra email:", err);
      return res.status(500).json({ error: "Lỗi server." });
    }

    const emailExists = result[0].count > 0;
    return res.json({ exists: emailExists });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng!" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng!" });
    }

    // Tạo Access Token & Refresh Token
    const accessToken = jwt.sign(
      { user_id: user[0].user_id, role: user[0].role },
      SECRET_KEY,
      { expiresIn: "1h" } // Access token hết hạn sau 1 giờ
    );

    const refreshToken = jwt.sign(
      { user_id: user[0].user_id },
      SECRET_KEY,
      { expiresIn: "7d" } // Refresh token có hiệu lực trong 7 ngày
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 1000 * 1000, // 1 giờ
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.json({
      message: "Đăng nhập thành công!",
      user: {
        user_id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
        phone: user[0].phone,
        avatar: user[0].avatar,
        role: user[0].role,
      },
    });
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    res.status(500).json({ error: "Lỗi server, vui lòng thử lại!" });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);

    if (!user.length)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// API Xóa Người Dùng
router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
   
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "Người dùng không tồn tại!" });
    }
    if (user[0].role === "admin") {
      return res
        .status(403)
        .json({ error: "Không thể xóa tài khoản admin!" });
    }

    await pool.query("DELETE FROM users WHERE user_id = ?", [userId]);

    res.json({ message: "Xóa người dùng thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ error: "Lỗi server! Không thể xóa người dùng." });
  }
});




module.exports = router;
