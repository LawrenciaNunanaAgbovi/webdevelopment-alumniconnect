const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  senderName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  recipientName: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      senderName: String,
      body: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Message', messageSchema);
