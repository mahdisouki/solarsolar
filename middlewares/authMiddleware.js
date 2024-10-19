const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');

// Middleware to verify JWT and protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is in the header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the admin by decoded ID
      req.admin = await Admin.findById(decoded.adminId).select('-password');

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};
