require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Chỉ định domain của frontend
    credentials: true, // Cho phép gửi cookie/token
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Import routes
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const bookingRoutes = require("./routes/booking");
const contactRoutes = require("./routes/contact");
// Sử dụng routes
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
