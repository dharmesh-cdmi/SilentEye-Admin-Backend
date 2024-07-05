const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel'); // Ensure you have the correct path to your user model
const { verifyUser } = require('../middleware/authMiddleware');
const { secret } = require('../configs/jwt.config');

dotenv.config();

// User login route
router.post('/login', async (req, res) => {
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
    const access_token = jwt.sign({ id: user._id, role: 'user' }, secret, { expiresIn: '1h' });

    // Optionally, handle remember_token logic if remember_me is true
    if (remember_me) {
      const remember_token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' }); // Example: Token valid for 7 days
      user.remember_token = remember_token;
      await user.save();
    }

    res.json({ access_token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example protected route
router.get('/profile', verifyUser, async (req, res) => {
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
});

module.exports = router;
