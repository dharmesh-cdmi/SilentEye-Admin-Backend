const userService = require('../services/UserService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils'); // Importing helper functions

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

module.exports = {
  getProfile
};
