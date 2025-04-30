const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/auth');


dotenv.config();

const cookieParser = require('cookie-parser');


const app = express();
const setupSwagger = require('./swagger');
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use('/api/auth', authRoutes);


setupSwagger(app);


// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// --- Routes ---
const userRoutes = require("./routes/userRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const majorRoutes = require("./routes/majorRoutes");


app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/majors", majorRoutes);


app.get("/api", (req, res) => {
  res.send(" API is running. Try /api/users or /api/opportunities.");
});



app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

