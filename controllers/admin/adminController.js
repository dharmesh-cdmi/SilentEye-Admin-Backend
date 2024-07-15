const adminService = require('../../services/adminService');
const bcrypt = require('bcrypt');

// Controller to create a new admin
const createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to get admin details by ID
const getAdminDetails = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.admin.id, ['password']);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Reset password for admin
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin?.id;
    if (!adminId) {
      return res.status(400).json({ message: 'Inavlid Admin Id' });
    }
    const admin = await adminService.getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid old password' });
    }
    await adminService.changeAdminPassword(newPassword, admin);
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAdmin,
  getAdminDetails,
  changePassword
};
