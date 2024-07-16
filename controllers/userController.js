const userService = require('../services/userService');
const { apiErrorResponse, apiSuccessResponse, HTTP_STATUS_MESSAGE, HTTP_STATUS } = require('../utils');

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(404).json({ message: error.message });
  }
};

// Fetch All Users
const FetchAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers(req.query);
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
    const user = await userService.addUserHistory(req.params.id, req.body);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'User not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getProfile,
  FetchAllUsers,
  RegisterUser,
  UpdateUser,
  DeleteUser,
  AddUserHistory,
  FetchUserById
};
