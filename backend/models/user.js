const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  major: { type: String },
  graduationYear: { type: Number },
  company: { type: String },
  title: { type: String },
  email: { type: String, required: true, unique: true },
  linkedin: { type: String },
  joined: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
