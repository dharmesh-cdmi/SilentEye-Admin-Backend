// controllers/adminController.js

const Admin = require('../../models/admin/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { accessTokenSecret, accessTokenExpiresIn } = require('../../configs/jwt.config');

// Controller to create a new admin
exports.createAdmin = async (req, res) => {
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

// Admin login controller
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const access_token = jwt.sign({ id: admin._id, role: 'admin' }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
    res.json({ access_token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get admin details
exports.getAdminDetails = async (req, res) => {
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
