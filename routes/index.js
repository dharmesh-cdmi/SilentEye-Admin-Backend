const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');
const visitorRoutes = require('./admin/visitorRoutes');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Set up routes
router.use('/', authRoutes);
router.use('/admin',verifyAdmin, adminRoutes);
router.use('/settings', settingsRoutes);

module.exports = router; 