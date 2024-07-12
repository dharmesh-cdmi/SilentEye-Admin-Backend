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

module.exports = {
  getProfile
};
