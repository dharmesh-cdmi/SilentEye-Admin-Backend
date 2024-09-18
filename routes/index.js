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
const planRoutes = require('./planRoutes');
const shippingRoutes = require('./shippingRoutes');
const refundRequestRoutes = require('./refundRequestRoutes');
const withdrawalRequestRoutes = require('./withdrawalRequestRoutes');
const discountRoutes = require('./discountRoutes');
const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');
const settingRoutes = require('./refundSettingRoutes');
const shippingTrackingRoutes = require('./shippingTrackingRoutes');
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
router.use('/plan', planRoutes);
router.use('/tickets', require('./ticketRoutes'));
router.use('/managers', require('./managerRoutes'));
router.use('/users', userRoutes);
router.use('/shipping', shippingRoutes);
router.use('/refund-request', refundRequestRoutes);
router.use('/discount', discountRoutes);
router.use('/setting', settingRoutes);
router.use('/shipping-tracking', shippingTrackingRoutes);
router.use('/withdrawals', withdrawalRequestRoutes);

module.exports = router;
