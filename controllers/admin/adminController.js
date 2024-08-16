const adminService = require('../../services/adminService');
const bcrypt = require('bcrypt');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Assuming you have imported the helper functions

// Controller to create a new admin
const createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);
    return apiSuccessResponse(
      res, 
      'Admin created successfully', 
      newAdmin, HTTP_STATUS.CREATED
    );
  } catch (err) {
    return apiErrorResponse(
      res, 
      err.message, 
      null, 
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

// Controller to get admin details by ID
const getAdminDetails = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.admin.id, ['password']);
    if (!admin) {
      return apiErrorResponse(
        res, 
        'Admin not found', 
        null, 
        HTTP_STATUS.NOT_FOUND
      );
    }
    return apiSuccessResponse(
      res, 
      'Admin details retrieved successfully',
      admin);
  } catch (err) {
    return apiErrorResponse(
      res, 'Server error', 
      null, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Controller to change admin password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin?.id;
    if (!adminId) {
      return apiErrorResponse(
        res, 
        'Invalid Admin Id', 
        null, 
        HTTP_STATUS.BAD_REQUEST);
    }
    const admin = await adminService.getAdminById(adminId);
    if (!admin) {
      return apiErrorResponse(
        res, 
        'Admin not found', 
        null, 
        HTTP_STATUS.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return apiErrorResponse(
        res, 
        'Invalid old password', 
        null, 
        HTTP_STATUS.UNAUTHORIZED);
    }
    await adminService.changeAdminPassword(newPassword, admin);
    return apiSuccessResponse(
      res, 
      'Password updated successfully', 
      null, 
      HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(
      res, 
      'Server error', 
      null, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  createAdmin,
  getAdminDetails,
  changePassword
};
