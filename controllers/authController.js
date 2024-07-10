const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { accessTokenSecret, accessTokenExpiresIn, refreshTokenSecret, refreshTokenExpiresIn } = require('../configs/jwt.config');
 
// User login controller
const login = async (req, res) => {
  const { email, password, remember_me } = req.body; // Assuming remember_me flag is sent in the request body

  console.log('Request body:', req.body); // Debug: Log request body

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
    const access_token = jwt.sign(
      { id: user._id, role: 'user' },
      accessTokenSecret,
      { expiresIn: accessTokenExpiresIn }
    );

    // Handle remember_token logic if remember_me is true
    let remember_token;
    if (remember_me) {
      remember_token = jwt.sign(
        { id: user._id },
        refreshTokenSecret,
        { expiresIn: refreshTokenExpiresIn }
      );
      user.remember_token = remember_token;
      await user.save();
    }

    // Include remember_token only if it was generated
    const response = { access_token };
    if (remember_me) {
      response.refresh_token = remember_token;
    }

    // console.log('Response:', response); // Debug: Log final response
    res.json(response);

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