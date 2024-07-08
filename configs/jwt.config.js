// configs/jwtConfig.js
module.exports = {
    secret: process.env.JWT_SECRET, // Read the secret key from an environment variable
    expiresIn: '1h',                // Token expiration time (optional, but recommended)
  };
  