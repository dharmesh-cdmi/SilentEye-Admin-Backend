
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/admin/adminController');
const { verifyUser } = require('../middleware/authMiddleware');


router.post('/login', authController.login);
router.post('/admin/login', adminController.loginAdmin);

//protected route
router.get('/profile', verifyUser, authController.getProfile);

module.exports = router;
