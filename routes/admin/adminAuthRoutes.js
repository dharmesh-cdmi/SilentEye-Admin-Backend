// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin, getAdminDetails } = require('../../controllers/adminController');
const { verifyAdmin } = require('../../middleware/authMiddleware');

// Route to create a new admin
router.post('/', createAdmin);

// Admin login route
router.post('/login', loginAdmin);

// Route to get admin details
router.get('/details', verifyAdmin, getAdminDetails);

module.exports = router;
