require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const hydrationRoutes = require("./routes/hydrationRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hydration", hydrationRoutes);
app.get("/api/health", (req, res) => {
  res.json({ message: "Sipup backend is running" });
});

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});
