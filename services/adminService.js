const bcrypt = require('bcrypt');
const Admin = require('../models/admin/adminModel');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

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
const getAdminById = async (adminId, fieldsToExclude = []) => {
  try {
    let query = Admin.findById(adminId);

    if (fieldsToExclude.length > 0) {
      fieldsToExclude.forEach(field => {
        query = query.select(`-${field}`);
      });
    }

    const admin = await query.exec();
    return admin;
  } catch (err) {
    throw err; // Propagate the error
  }
};

const changeAdminPassword = async (newPass, admin) => {
  try {
    const hashedPassword = await bcrypt.hash(newPass, SALT_ROUNDS);
    admin.password = hashedPassword;
    await admin.save();
  } catch (err) {
    throw err; // Propagate the error
  }
};

module.exports = {
  createAdmin,
  getAdminById,
  changeAdminPassword
};
