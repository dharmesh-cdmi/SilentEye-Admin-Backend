const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const contactFormRoutes = require('./contactFormRoutes');
const extensionRoutes = require('./extensionRoutes');
const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');
const visitorRoutes = require('./admin/visitorRoutes');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Set up routes
// router.use('/auth', authRoutes);
router.use('/setting', settingsRoutes);
router.use('/contact-form', contactFormRoutes);
router.use('/extension', extensionRoutes);
router.use('/', authRoutes);
router.use('/admin',verifyAdmin, adminRoutes);

module.exports = router; 