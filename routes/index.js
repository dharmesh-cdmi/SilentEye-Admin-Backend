const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const contactFormRoutes = require('./contactFormRoutes');
const extensionRoutes = require('./extensionRoutes');

const router = express.Router();

// Set up routes
// router.use('/auth', authRoutes);
router.use('/setting', settingsRoutes);
router.use('/contact-form', contactFormRoutes);
router.use('/extension', extensionRoutes);


module.exports = router;