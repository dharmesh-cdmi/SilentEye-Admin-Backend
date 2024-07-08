const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME;

const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword);

  return passwordMatch;
};

const createAccessToken = (payload) => {
  let token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
  });
  return token;
};

const createRefreshToken = (payload) => {
  let token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
  });
  return token;
};

const verifyAccessToken = (req, res, next) => {
  const { token } = res.locals;
  try {
    let payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (payload) {
      res.locals.payload = payload;
      return next();
    }
    res.status(401).send("Unauthorized");
  } catch (error) {
    res.status(401).send("Verify Token Error!");
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const userId = res.locals.payload.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    }
    if (user.team !== 'admin') {
      res.status(403).send("Unauthorized");
    }
    return next();
  } catch (error) {
    res.status(403).send("Verify Admin Error!");
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

const stripToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
      res.locals.token = token;
      return next();
    }
    res.status(401).send("Unauthorized");
  } catch (error) {
    console.log(error);
    res.status(401).send("Strip Token Error!");
  }
};

module.exports = {
  stripToken,
  verifyAccessToken,
  verifyAdmin,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  comparePassword,
  hashPassword,
};
