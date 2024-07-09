
const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController'); // Ensure you have the correct path to your controller
const { loginAdmin } = require('../controllers/admin/adminController');
const { verifyUser } = require('../middleware/authMiddleware');

// User login route
router.post('/login', login);
router.post('/admin/login', loginAdmin);
// Example protected route
router.get('/profile', verifyUser, getProfile);

module.exports = router;
