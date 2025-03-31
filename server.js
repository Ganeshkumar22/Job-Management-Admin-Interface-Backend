// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://job-management-admin-interface-frontend-jh5scwwe4.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/job-management"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Job Management API is running ✅");
});

// Routes
app.use("/api/jobs", require("./routes/jobs"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
