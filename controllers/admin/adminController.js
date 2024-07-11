// controllers/adminController.js

const Admin = require('../../models/admin/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  { accessTokenSecret, accessTokenExpiresIn, refreshTokenSecret, refreshTokenExpiresIn } = require('../../configs/jwt.config');

// Controller to create a new admin
const createAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ ...req.body, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const loginAdmin = async (req, res) => {
  const { email, password, remember_me } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update lastLoggedInAt
    admin.lastLoggedInAt = new Date();
    await admin.save();

    // Generate JWT access token
    const access_token = jwt.sign(
      { id: admin._id, role: 'admin' },
      accessTokenSecret,
      { expiresIn: accessTokenExpiresIn }
    );

    let refresh_token;

    // Handle refresh_token logic if remember_me is true
    if (remember_me) {
      refresh_token = jwt.sign(
        { id: admin._id },
        refreshTokenSecret,
        { expiresIn: refreshTokenExpiresIn }
      );
      admin.refresh_token = refresh_token;
      await admin.save();
    }

    // Include refresh_token only if it was generated
    const response = { access_token };
    if (remember_me) {
      response.refresh_token = refresh_token;
    }

    res.json(response);
  } catch (error) {
    console.error('Admin Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get admin details
const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports ={
  createAdmin,
  loginAdmin,
  getAdminDetails
}