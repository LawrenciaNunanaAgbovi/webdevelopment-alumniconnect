const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const majorRoutes = require("./routes/majorRoutes");
const messageRoutes = require('./routes/messageRoutes');
const setupSwagger = require("./swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


const corsOptions = {
  origin: 'http://138.197.93.75', 
  credentials: true,              
};

app.use(cors(corsOptions));         
app.use(express.json());
app.use(cookieParser());



setupSwagger(app);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/majors", majorRoutes);
app.use('/api/messages', messageRoutes);


app.get("/api", (req, res) => {
  res.send("API is running. Try /api/users or /api/opportunities.");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
