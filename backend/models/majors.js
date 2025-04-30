
const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
});

module.exports = mongoose.model('Major', majorSchema);
