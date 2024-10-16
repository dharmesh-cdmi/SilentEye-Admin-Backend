const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');

const router = express.Router();

// Set up routes
// router.use('/auth', authRoutes);
router.use('/settings', settingsRoutes);


module.exports = router;