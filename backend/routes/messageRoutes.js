const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const requireAuth = require('../middleware/requireAuth');
const User = require('../models/user'); 


router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find({ recipientEmail: req.user.email });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', requireAuth, async (req, res) => {
  try {
    const { recipientEmail, title, body } = req.body;

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const newMessage = new Message({
      senderEmail: req.user.email,
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

router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find({
      recipientEmail: req.user.email,
      parentMessageId: null 
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/thread', requireAuth, async (req, res) => {
  try {
    const rootMessage = await Message.findById(req.params.id);
    const replies = await Message.find({ parentMessageId: req.params.id }).sort({ createdAt: 1 });

    res.json({ root: rootMessage, replies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




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

router.post('/:id/reply', requireAuth, async (req, res) => {
  try {
    console.log('Reply request received for message ID:', req.params.id);
    console.log('Request body:', req.body);
    console.log('Logged-in user:', req.user);

    const { body } = req.body;
    if (!body) {
      console.warn('❌ Reply body missing');
      return res.status(400).json({ error: 'Reply body is required' });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      console.warn('❌ Message not found with ID:', req.params.id);
      return res.status(404).json({ error: 'Message not found' });
    }

    message.replies.push({
      senderId: req.user._id, // ⬅️ safer than req.user.id
      senderName: req.user.name,
      body: body,
    });

    const saved = await message.save();
    console.log('✅ Reply saved');
    res.json(saved);
  } catch (err) {
    console.error('❌ Reply error (500):', err);
    res.status(500).json({ error: 'Failed to send reply' });
  }
});





module.exports = router;
