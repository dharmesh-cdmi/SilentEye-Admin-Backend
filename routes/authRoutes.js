// routes/auth.js

const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController'); // Ensure you have the correct path to your controller
const { verifyUser } = require('../middleware/authMiddleware');

// User login route
router.post('/login', login);

// Example protected route
router.get('/profile', verifyUser, getProfile);

module.exports = router;
