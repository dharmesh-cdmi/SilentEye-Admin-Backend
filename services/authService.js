const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/admin/adminModel');
const helper= require('../utils');
const { logUserLogin } = require('../services/loginService'); 
const { refreshTokenSecret } = require('../configs/jwt.config');


const authenticateUser = async (email, password, country, device, IP) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Log user login details
    await logUserLogin(email, user._id, country, device, IP);

    return user;
  } catch (error) {
    throw error;
  }
};

const authenticateAdmin = async (emailOrUsername, password) => {
  try {
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!admin) {
      throw new Error('Invalid email/username or password');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid email/username or password');
    }

    return admin;
  } catch (error) {
    throw error;
  }
};

const generateTokens = async (userOrAdmin) => {
  try {
    const accessToken = helper.generateAccessToken(userOrAdmin);
    const refreshToken = helper.generateRefreshToken(userOrAdmin);

    // Store the refresh token in the database
    userOrAdmin.refreshToken = refreshToken;
    await userOrAdmin.save();

    return { access_token: accessToken, refresh_token: refreshToken };
  } catch (error) {
    throw error;
  }
};

const refreshTokens = async (refreshToken) => {
  try {
    const decoded = helper.verifyToken(refreshToken, refreshTokenSecret);
    const userOrAdmin = await User.findById(decoded.id) || await Admin.findById(decoded.id);

    if (!userOrAdmin || userOrAdmin.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    // Generate new tokens
    const accessToken = helper.generateAccessToken(userOrAdmin);
    const newRefreshToken = helper.generateRefreshToken(userOrAdmin);

    // Store the new refresh token in the database
    userOrAdmin.refreshToken = newRefreshToken;
    await userOrAdmin.save();

    return { access_token: accessToken, refresh_token: newRefreshToken };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
  generateTokens,
  refreshTokens
};
