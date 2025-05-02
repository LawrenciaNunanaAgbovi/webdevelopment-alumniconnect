const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const requireAuth = require('../middleware/requireAuth');
const User = require('../models/user'); 

// Get all messages for logged-in user
router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find({ recipientEmail: req.user.email });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a message

router.post('/', requireAuth, async (req, res) => {
  try {
    const { recipientEmail, title, body } = req.body;

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const newMessage = new Message({
      senderId: req.user._id,
      senderName: req.user.name,
      recipientEmail,
      recipientName: recipient.name,
      title,
      body,
      read: false,
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  

// Mark a message as read
router.put('/:id/read', requireAuth, async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a reply
router.post('/:id/reply', requireAuth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.replies.push({ body: req.body.body });
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
