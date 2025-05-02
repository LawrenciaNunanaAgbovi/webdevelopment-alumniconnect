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

    
    if (!user.approved) {
      return res.status(403).json({ error: 'Account not yet approved by admin' });
    }

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
      secure: false,
      sameSite: 'Lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route POST /api/auth/signup
 * @desc Registers a new user (admins are approved automatically)
 */
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

    
    console.log('Signup role:', role);

    const normalizedRole = role ? role.toLowerCase() : 'user';
    const approved = normalizedRole === 'admin';

    const newUser = new User({
      name,
      email,
      username,
      role: normalizedRole,
      password,
      major,
      graduationYear,
      company,
      title,
      linkedin,
      approved: normalizedRole === 'admin'
    });

    const saved = await newUser.save();
    res.status(201).json({ message: 'Signup successful. Awaiting admin approval.', user: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/protected', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated',
    user: req.user,
  });
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
      major: user.major,
      graduationYear: user.graduationYear,
      company: user.company,
      title: user.title,
      linkedin: user.linkedin,
      approved: user.approved,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user profile" });
  }
});
const jwt = require('jsonwebtoken');

router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwtUtils.generateAccessToken({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
});



router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
});



module.exports = router;
