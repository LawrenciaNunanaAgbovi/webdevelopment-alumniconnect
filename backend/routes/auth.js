const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt');
const User = require('../models/user'); 
const requireAuth = require('../middleware/requireAuth');

/**
 * @route POST /api/auth/login
 * @desc Logs in a user and returns access + refresh tokens in cookies
 */
router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('Logged in user:', user);
    if (!user) return res.status(401).json({ error: 'Invalid email' });

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    };

    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // Set to false for HTTP/local development
      sameSite: 'Lax', // Allow cross-origin (needed for dev)
      maxAge: 15 * 60 * 1000,
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to false for HTTP/local development
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    

    // ✅ Return full user data in response
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Signup Route
router.post('/signup', async (req, res) => {
  const {
    name,
    email,
    role,
    username,
    password,
    major,
    graduationYear,
    company,
    title,
    linkedin,
  } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({
      name,
      email,
      username,
      role: role || 'user',
      password, // ⚠️ Only if you're handling password storage securely
      major,
      graduationYear,
      company,
      title,
      linkedin,
    });

    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/protected', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated',
    user: req.user, // user info from the token
  });
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user profile" });
  }
});


module.exports = router;
