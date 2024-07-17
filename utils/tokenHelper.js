const jwt = require('jsonwebtoken');
const Admin = require('../models/admin/adminModel');

const { accessTokenSecret, refreshTokenSecret, accessTokenExpiresIn, refreshTokenExpiresIn } = require('../configs/jwt.config');

const generateAccessToken = (userOrAdmin) => {
  return jwt.sign({ id: userOrAdmin._id, role: userOrAdmin instanceof Admin ? 'admin' : 'user' }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
};

const generateRefreshToken = (userOrAdmin) => {
  return jwt.sign({ id: userOrAdmin._id }, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
