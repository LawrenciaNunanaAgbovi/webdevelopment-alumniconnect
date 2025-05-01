const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const majorRoutes = require("./routes/majorRoutes");
const setupSwagger = require("./swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS setup with frontend domain
const corsOptions = {
  origin: 'http://138.197.93.75', // frontend URL
  credentials: true,              // allow cookies (e.g. accessToken)
};

app.use(cors(corsOptions));         // ✅ Apply cors middleware here
app.use(express.json());
app.use(cookieParser());

// ✅ Swagger
setupSwagger(app);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/majors", majorRoutes);

// ✅ Test endpoint
app.get("/api", (req, res) => {
  res.send("API is running. Try /api/users or /api/opportunities.");
});

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
