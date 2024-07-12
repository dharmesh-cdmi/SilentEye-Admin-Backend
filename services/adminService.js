const bcrypt = require('bcrypt');
const Admin = require('../models/admin/adminModel');

// Service function to create a new admin
const createAdmin = async (adminData) => {
  try {
    const { password } = adminData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ ...adminData, password: hashedPassword });
    await newAdmin.save();
    return newAdmin;
  } catch (err) {
    throw err; // Propagate the error to handle it in the controller or higher layers
  }
};

// Service function to get admin details by ID
const getAdminById = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId).select('-password');
    return admin;
  } catch (err) {
    throw err; // Propagate the error
  }
};

module.exports = {
  createAdmin,
  getAdminById
};
