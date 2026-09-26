const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Contact Manager API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});