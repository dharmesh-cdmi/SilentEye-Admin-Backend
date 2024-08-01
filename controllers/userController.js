
const { exportUsersData } = require("../services/exportService");
const userService = require("../services/userService")
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS, HTTP_STATUS_MESSAGE } = require('../utils'); // Importing helper functions
const fs = require('fs');

// Controller to get user profile
const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    return apiSuccessResponse(res, 'User profile retrieved successfully', user);
  } catch (error) {
    console.error('Profile error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.NOT_FOUND);
  }
};

// Fetch All Users
const FetchAllUsers = async (req, res) => {
  try {
    // getting params through req.body
    const users = await userService.fetchAllUsers(req.body);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], users, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const FetchUserById = async (req, res) => {
  try {
    const user = await userService.fetchUserById(req.params.userId);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'User not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// Register User
const RegisterUser = async (req, res) => {
  const avatar = req.file;
  let avatarPath = (avatar && avatar.path) || null;
  let data = avatarPath ? { ...req.body, avatar: avatarPath } : req.body;
  try {
    const user = await userService.registerUser(data);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], user, HTTP_STATUS.CREATED);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[400], error.message, HTTP_STATUS.BAD_REQUEST);
    }
    if (error.message.includes('duplicate key error') || error.message.includes('Email is already in use')) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[400], 'Email already exists', HTTP_STATUS.BAD_REQUEST);
    }
    console.log('Error: ', error);
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// Update User
const UpdateUser = async (req, res) => {
  const avatar = req.file;
  console.log(req.body);
  let avatarPath = (avatar && avatar.path) || null;
  try {
    let data = avatarPath ? { ...req.body, avatar: avatarPath } : req.body;
    const user = await userService.updateUser(req.params.userId, data);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'User not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    console.log('Error: ', error);
    if (error.name === 'ValidationError') {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[400], error.message, HTTP_STATUS.BAD_REQUEST);
    }
    if (error.message.includes('duplicate key error') || error.message.includes('Email is already in use')) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[400], 'Email already exists', HTTP_STATUS.BAD_REQUEST);
    }
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// Delete User
const DeleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'User not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const AddUserHistory = async (req, res) => {
  try {
    const user = await userService.addUserHistory(req.params.userId, req.body);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'User not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const SaveVisitor = async (req, res) => {
  try {
    const user = await userService.saveVisitor(req.body);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[400], 'Visitor Already Exists With Same IP', HTTP_STATUS.BAD_REQUEST);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], user, HTTP_STATUS.CREATED);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const FetchVisitor = async (req, res) => {
  try {
    const user = await userService.fetchVisitor(req.params.ipAddress);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const UpdateVisitor = async (req, res) => {
  try {
    const user = await userService.updateVisitor(req.params.ipAddress, req.body);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'Visitor not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const AddUserHistoryByVisitor = async (req, res) => {
  try {
    const user = await userService.addUserHistoryByIP(req.params.ipAddress, req.body);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'Visitor not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const DownloadUsersData = async (req, res) => {
  try {
    const { format } = req.query; // 'pdf' or 'xlsx'
    let data = await userService.fetchAllUsers(req.body);

    const path = await exportUsersData(format, data?.users);
    res.download(path, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file.');
      } else {
        // Optional: Delete the file after download and downloads folder
        fs.unlink(path, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      }
    })

  } catch (error) {
    console.error('Error generating analytics data:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getProfile,
  FetchAllUsers,
  RegisterUser,
  UpdateUser,
  DeleteUser,
  AddUserHistory,
  FetchUserById,
  SaveVisitor,
  FetchVisitor,
  UpdateVisitor,
  AddUserHistoryByVisitor,
  DownloadUsersData
};
