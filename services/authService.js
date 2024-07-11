const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/admin/adminModel'); // Import Admin model
const { accessTokenSecret, accessTokenExpiresIn, refreshTokenSecret, refreshTokenExpiresIn } = require('../configs/jwt.config');

const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const authenticateAdmin = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return admin;
  } catch (error) {
    throw error;
  }
};

const generateTokens = async (userOrAdmin, remember_me) => {
  try {
    // Generate JWT access token
    const accessToken = jwt.sign(
      { id: userOrAdmin._id, role: userOrAdmin instanceof Admin ? 'admin' : 'user' },
      accessTokenSecret,
      { expiresIn: accessTokenExpiresIn }
    );

    // Handle remember_token logic if remember_me is true
    let refreshToken;
    if (remember_me) {
      refreshToken = jwt.sign(
        { id: userOrAdmin._id },
        refreshTokenSecret,
        { expiresIn: refreshTokenExpiresIn }
      );
      userOrAdmin.remember_token = refreshToken;
      await userOrAdmin.save();
    }

    return { access_token: accessToken, refresh_token: refreshToken };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
  generateTokens
};
