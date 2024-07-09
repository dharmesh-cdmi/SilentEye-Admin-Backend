// controllers/adminController.js

const Admin = require('../../models/admin/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { accessTokenSecret, accessTokenExpiresIn } = require('../../configs/jwt.config');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

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

//Reset password for admin
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid old password' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    admin.password = hashedPassword;
    await admin.save();
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}