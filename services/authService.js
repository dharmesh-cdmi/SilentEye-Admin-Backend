const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
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

const generateTokens = async (user, remember_me) => {
  try {
    // Generate JWT access token
    const accessToken = jwt.sign(
      { id: user._id, role: 'user' },
      accessTokenSecret,
      { expiresIn: accessTokenExpiresIn }
    );

    // Handle remember_token logic if remember_me is true
    let refreshToken;
    if (remember_me) {
      refreshToken = jwt.sign(
        { id: user._id },
        refreshTokenSecret,
        { expiresIn: refreshTokenExpiresIn }
      );
      user.remember_token = refreshToken;
      await user.save();
    }

    return { access_token: accessToken, refresh_token: refreshToken };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateUser,
  generateTokens
};
