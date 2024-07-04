const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const adminRoutes = require('./admin/adminRoutes');

const router = express.Router();

// Set up routes
// router.use('/auth', authRoutes);
router.use('/settings', settingsRoutes);

router.use('/admin', adminRoutes);

module.exports = router;