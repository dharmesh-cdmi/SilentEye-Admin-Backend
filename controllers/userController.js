const userService = require('../services/UserService');

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

// Register User
const RegisterUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], user, HTTP_STATUS.CREATED);
  } catch (error) {
    console.log('Error: ', error);
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// Update User
const UpdateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return apiErrorResponse(res, HTTP_STATUS_MESSAGE[404], 'User not found', HTTP_STATUS.NOT_FOUND);
    }
    return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

// Delete User
const DeleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
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
  AddUserHistory
};
