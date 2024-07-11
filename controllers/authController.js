const authService = require('../services/authService');

const login = async (req, res) => {
  const { email, password, remember_me } = req.body;

  try {
    // Example: Authenticate user
    const user = await authService.authenticateUser(email, password);
    const tokens = await authService.generateTokens(user, remember_me);
    res.json(tokens);
  } catch (error) {
    console.error('User Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password, remember_me } = req.body;

  try {
    // Example: Authenticate admin
    const admin = await authService.authenticateAdmin(email, password);
    const tokens = await authService.generateTokens(admin, remember_me);
    res.json(tokens);
  } catch (error) {
    console.error('Admin Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  login,
  loginAdmin
};
