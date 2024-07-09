// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure you have the correct path to your user model
const { accessTokenSecret, accessTokenExpiresIn, refreshTokenSecret, refreshTokenExpiresIn } = require('../configs/jwt.config');
 
// User login controller
const login = async (req, res) => {
  const { email, password, remember_me } = req.body; // Assuming remember_me flag is sent in the request body

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update lastLoggedInAt
    user.lastLoggedInAt = new Date();
    await user.save();

    // Generate JWT access token
    const access_token = jwt.sign({ id: user._id, role: 'user' }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });

    // Optionally, handle remember_token logic if remember_me is true
    if (remember_me) {
      const remember_token = jwt.sign({ id: user._id }, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn }); // Example: Token valid for some days
      user.remember_token = remember_token;
      await user.save();
    }

    res.json({ access_token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User profile controller
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports ={
  login,getProfile
}