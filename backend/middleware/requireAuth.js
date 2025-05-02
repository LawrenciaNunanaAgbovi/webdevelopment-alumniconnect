// middleware/requireAuth.js
const jwt = require('jsonwebtoken'); // ✅ Only declared once

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function requireAuth(req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.headers.cookie?.split('accessToken=')[1]?.split(';')[0];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = {
      _id: decoded.id,  // 👈 this line is crucial
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    };
     // ✅ Now req.user is correctly set
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

module.exports = requireAuth;
