const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const contactFormRoutes = require('./contactFormRoutes');
const extensionRoutes = require('./extensionRoutes');
const contentManageRoutes = require('./contentManageRoutes');
const paymentGatewayRoutes = require('./paymentGatewayRoutes');
const paymentRoutes = require('./paymentRoutes');
const productRoutes = require('./productRoutes');
const addonRoutes = require('./addonRoutes');
const upsellRoutes = require('./upsellRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Set up routes
// router.use('/auth', authRoutes);
router.use('/setting', settingsRoutes);
router.use('/contact-form', contactFormRoutes);
router.use('/extension', extensionRoutes);
router.use('/content-manage', contentManageRoutes);
router.use('/', authRoutes);
router.use('/admin', verifyAdmin, adminRoutes);
router.use('/payment', paymentRoutes);
router.use('/payment-gateway', paymentGatewayRoutes);
router.use('/product', productRoutes);
router.use('/addon', addonRoutes);
router.use('/upsell', upsellRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/tickets', require('./ticketRoutes'));
router.use('/managers', require('./managerRoutes'));
router.use('/users', userRoutes);

module.exports = router;
