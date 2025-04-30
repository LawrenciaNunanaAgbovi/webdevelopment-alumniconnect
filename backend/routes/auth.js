const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt');
const User = require('../models/user'); 

/**
 * @route POST /api/auth/login
 * @desc Logs in a user and returns access + refresh tokens in cookies
 */
router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
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
      secure: true,
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
