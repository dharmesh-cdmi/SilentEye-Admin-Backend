const authService = require('../services/authService');

const login = async (req, res) => {
  const { email, password, remember_me } = req.body;

  try {
    const user = await authService.authenticateUser(email, password);
    const tokens = await authService.generateTokens(user, remember_me);
    res.json(tokens);
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  login
};
