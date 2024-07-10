const jwt = require('jsonwebtoken');
const Admin = require('../models/admin/adminModel');
const User = require('../models/userModel');
const { accessTokenSecret} = require('../configs/jwt.config');


// Middleware to verify user
const verifyUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    res.status(400).json({ error: 'Please Login To Continue.' });
  }
};


const verifyAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    let decoded;
    let admin;

    try {
      decoded = jwt.verify(token, accessTokenSecret);
      admin = await Admin.findById(decoded.id);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Attempt to verify with remember_token if access token is expired
        const decodedRemember = jwt.verify(token, refreshTokenSecret);
        admin = await Admin.findById(decodedRemember.id);
        if (!admin) {
          return res.status(401).json({ error: 'Unauthorized.' });
        }
      } else {
        return res.status(401).json({ error: 'Invalid token.' });
      }
    }

    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Please Login To Continue.' });
  }
};

// Middleware to validate role
const roleValidator = (roles) => {
  return (req, res, next) => {
    const userRole = req.admin?.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

// Middleware to check if it is user or admin and authenticate
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);

    if (!user) {
      const admin = await Admin.findById(decoded.id);
      req.admin = admin;
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = { 
  verifyUser, 
  verifyAdmin, 
  roleValidator,
  authenticateUser 
};
