const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  posted_by: String,
  type: String, 
  is_paid: Boolean,
  amount: Number,
  needs_approval: Boolean,
  approved: Boolean,
  approved_by: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
