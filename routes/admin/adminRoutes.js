// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { createAdmin, getAdminDetails, resetPassword } = require('../../controllers/admin/adminController');
const visitorRoutes = require('./visitorRoutes');
const orderRoutes = require('./orderRoute');
const { verifyAdmin } = require('../../middleware/authMiddleware');
const validationMiddleware = require('../../middleware/validationMiddleware');
const userSchemas = require('../../validation/userSchemas');

// Route to create a new admin
router.post('/', createAdmin);
router.get('/details', getAdminDetails);
router.use('/visitors', visitorRoutes);
router.use('/orders', orderRoutes);
router.post(
    '/reset-password',
    verifyAdmin,
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    resetPassword
);

module.exports = router;
