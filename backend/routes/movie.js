const express = require("express");
const router = express.Router();
const pool = require("../db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lấy danh sách phim
router.get("/get_list", (req, res) => {
  pool.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      console.error("Database query failed: ", err); // Ghi lỗi chi tiết
      return res.status(500).json({ error: err.message }); // Trả lỗi về client
    }
    console.log("Query successful, sending results"); // Ghi lại khi query thành công
    res.json(results); // Trả về dữ liệu dưới dạng JSON
  });
});

// Lấy thông tin phim theo ID
router.get("/get_movie/:id", (req, res) => {
  const movieId = req.params.id;

  // Kiểm tra nếu id không hợp lệ
  if (!movieId || isNaN(movieId)) {
    return res.status(400).json({ error: "ID phim không hợp lệ" });
  }

  // Truy vấn CSDL
  pool.query(
    "SELECT * FROM movies WHERE movie_id = ?",
    [movieId],
    (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn CSDL: ", err);
        return res.status(500).json({ error: "Lỗi server" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Không tìm thấy phim" });
      }

      res.json(results[0]);
    }
  );
});

// Xóa một bộ phim theo ID
router.delete("/delete/:id", (req, res) => {
  const movieId = req.params.id;

  // Kiểm tra nếu ID không hợp lệ
  if (!movieId || isNaN(movieId)) {
    return res.status(400).json({ error: "ID phim không hợp lệ" });
  }

  // Truy vấn DELETE
  pool.query(
    "DELETE FROM movies WHERE movie_id = ?",
    [movieId],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa phim:", err);
        return res.status(500).json({ error: "Lỗi server" });
      }

      // Kiểm tra nếu không có phim nào bị xóa
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Không tìm thấy phim để xóa" });
      }

      res.json({ message: "Xóa phim thành công!", movie_id: movieId });
    }
  );
});

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Định nghĩa thư mục lưu poster
const posterPath = path.join(__dirname, "../../frontend/src/assets/poster");

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(posterPath)) {
  fs.mkdirSync(posterPath, { recursive: true });
  console.log("📂 Tạo thư mục frontend/src/assets/poster/ thành công!");
}

// Cấu hình Multer để lưu file vào frontend/assets/poster
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, posterPath);
  },
  filename: function (req, file, cb) {
    const filePath = path.join(posterPath, file.originalname);

    // Kiểm tra nếu file đã tồn tại
    if (fs.existsSync(filePath)) {
      console.log("🟢 File đã tồn tại, giữ nguyên:", file.originalname);
      cb(null, file.originalname); // Giữ nguyên tên file
    } else {
      console.log("🆕 File mới, lưu vào thư mục:", file.originalname);
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage: storage });

// API cập nhật phim
router.put("/update/:id", upload.single("poster"), (req, res) => {
  const movieId = req.params.id;
  const {
    title,
    description,
    duration,
    release_date,
    age,
    genre,
    actors,
    directors,
    video,
  } = req.body;

  if (
    !title ||
    !description ||
    !duration ||
    !release_date ||
    !age ||
    !genre ||
    !actors ||
    !directors ||
    !video
  ) {
    return res.status(400).json({ error: "Thiếu thông tin cần cập nhật!" });
  }

  let query = `
    UPDATE movies SET 
      title = ?, 
      description = ?, 
      duration = ?, 
      release_date = ?, 
      age = ?, 
      genre = ?, 
      actors = ?, 
      directors = ?, 
      video = ?
  `;
  let params = [
    title,
    description,
    duration,
    release_date,
    age,
    genre,
    actors,
    directors,
    video,
  ];

  if (req.file) {
    const filePath = req.file.originalname;
    query += ", poster = ?";
    params.push(filePath);
  }

  query += " WHERE movie_id = ?";
  params.push(movieId);

  pool.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi server", details: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Không tìm thấy phim" });

    res.json({
      message: "Cập nhật thành công!",
      movie_id: movieId,
      poster: req.file
        ? `assets/poster/${req.file.originalname}`
        : "Không cập nhật poster",
    });
  });
});

// API thêm mới phim
router.post("/add", upload.single("poster"), (req, res) => {
  const {
    title,
    description,
    duration,
    release_date,
    age,
    genre,
    actors,
    directors,
    video,
  } = req.body;

  if (
    !title ||
    !description ||
    !duration ||
    !release_date ||
    !age ||
    !genre ||
    !actors ||
    !directors ||
    !video
  ) {
    return res.status(400).json({ error: "Thiếu thông tin cần thêm!" });
  }
  
  // Kiểm tra nếu có tệp poster
  let posterFilePath = null;
  if (req.file) {
    const fileName = req.file.originalname;
    posterFilePath = `${fileName}`;
    const destPath = path.join(posterPath, fileName);
    if (fs.existsSync(destPath)) {
      console.log("🟢 File đã tồn tại, giữ nguyên:", fileName);
    } else {
      console.log("🆕 File mới, lưu vào thư mục:", fileName);
      fs.renameSync(req.file.path, destPath); // Di chuyển file vào thư mục đúng
    }
  }
  
  // Câu truy vấn để thêm bộ phim mới vào cơ sở dữ liệu
  const query = `
    INSERT INTO movies (title, description, duration, release_date, age,created_at,poster, genre, actors, directors, video ) 
    VALUES (?, ?, ?, ?, ?,CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)
  `;

  const params = [
    title,
    description,
    duration,
    release_date,
    age,
    posterFilePath || null,
    genre,
    actors,
    directors,
    video,
  ];
  
  // Thực hiện truy vấn
  pool.query(query, params, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm phim: ", err);
      return res.status(500).json({ error: "Lỗi server" });
    }

    res.json({
      message: "Thêm phim thành công!",
      movie_id: result.insertId,
      poster: posterFilePath || "Không có poster",
    });
  });
});

module.exports = router;
