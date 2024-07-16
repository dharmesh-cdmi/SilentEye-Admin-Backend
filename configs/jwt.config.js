require('dotenv').config();

module.exports = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'fnvSilentdksfhgEyefvng', // Read the secret key from an environment variable
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || '1h', // Token expiration time (optional, default is 1 hour)
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fnvSilentdksfhgEyefvngRefreshnfrn', // Read the Remember key from an environment variable
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME || '7d', // Remember Token expiration time (optional, default is 7days)
};
