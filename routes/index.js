const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const adminRoutes = require('./admin/adminAuthRoutes');
const userRoutes = require('./authRoutes');
const paymentGatewayRoutes = require('./paymentGatewayRoutes');
const paymentRoutes = require('./paymentRoutes');

const router = express.Router();

// Set up routes
// router.use('/auth', authRoutes);
router.use('/settings', settingsRoutes);
router.use('/admin', adminRoutes);
router.use('/', userRoutes);
router.use('/payment', paymentRoutes);
router.use('/payment-gateway', paymentGatewayRoutes);

module.exports = router;
