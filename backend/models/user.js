const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  major: { type: String },
  graduationYear: { type: Number },
  company: { type: String },
  title: { type: String },
  linkedin: { type: String },
  approved: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
