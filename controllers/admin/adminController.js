const adminService = require('../../services/adminService');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

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
    const admin = await adminService.getAdminById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAdmin,
  getAdminDetails
};
