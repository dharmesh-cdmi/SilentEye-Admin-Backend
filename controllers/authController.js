const authService = require('../services/authService');

const login = async (req, res) => {
  const { email, password, country, device, IP } = req.body;

  try {
    // Example: Authenticate user
    const user = await authService.authenticateUser(email, password, country, device, IP);
    const tokens = await authService.generateTokens(user);
    res.json(tokens);
  } catch (error) {
    console.error('User Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Example: Authenticate admin
    const admin = await authService.authenticateAdmin(emailOrUsername, password);
    const tokens = await authService.generateTokens(admin);
    res.json(tokens);
  } catch (error) {
    console.error('Admin Login error:', error);
    res.status(401).json({ message: error.message });
  }
}; 

const refreshToken =  async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  try {
    const tokens = await authService.refreshTokens(token);
    res.json(tokens);
  } catch (error) {
    console.error('Refresh Token error:', error); // Added debug statement
    res.status(403).json({ error: error.message });
  }
};


module.exports = {
  login,
  loginAdmin,
  refreshToken
};
