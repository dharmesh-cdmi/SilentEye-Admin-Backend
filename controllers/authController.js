const authService = require('../services/authService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils'); // Importing helper functions

// Controller for user login
const login = async (req, res) => {
  const { email, password, country, device, IP } = req.body;

  try {
    const user = await authService.authenticateUser(email, password, country, device, IP);
    const tokens = await authService.generateTokens(user);
    return apiSuccessResponse(res, 'User logged in successfully', tokens);
  } catch (error) {
    console.error('User Login error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.UNAUTHORIZED);
  }
};

// Controller for admin login
const loginAdmin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const admin = await authService.authenticateAdmin(emailOrUsername, password);
    const tokens = await authService.generateTokens(admin);
    return apiSuccessResponse(res, 'Admin logged in successfully', tokens);
  } catch (error) {
    console.error('Admin Login error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.UNAUTHORIZED);
  }
};

// Controller to refresh tokens
const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return apiErrorResponse(res, 'No token provided', null, HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const tokens = await authService.refreshTokens(token);
    return apiSuccessResponse(res, 'Tokens refreshed successfully', tokens);
  } catch (error) {
    console.error('Refresh Token error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.FORBIDDEN);
  }
};

module.exports = {
  login,
  loginAdmin,
  refreshToken
};
