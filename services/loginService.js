const Login = require('../models/loginModel'); // Adjust the path as needed

const logUserLogin = async (email, userId, country, device, IP) => {
  try {
    const login = new Login({
      email,
      userId,
      country,
      device,
      IP,
    });

    await login.save();
  } catch (error) {
    console.error('Error logging user login:', error);
  }
};

module.exports = {
  logUserLogin
};
