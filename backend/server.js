require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const bookingRoutes = require("./routes/booking");

// Sử dụng routes
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
