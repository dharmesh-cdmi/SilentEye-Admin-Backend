
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/admin/adminController');
const { verifyUser } = require('../middleware/authMiddleware');


router.post('/login', authController.login);
router.post('/admin/login', adminController.loginAdmin);

//protected route
router.get('/profile', verifyUser, userController.getProfile);

module.exports = router;
