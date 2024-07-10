const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const userRoutes = require('./authRoutes');
const paymentGatewayRoutes = require('./paymentGatewayRoutes');
const paymentRoutes = require('./paymentRoutes');
const productRoutes = require('./productRoutes');
const addonRoutes = require('./addonRoutes');
const upsellRoutes = require('./upsellRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');
const visitorRoutes = require('./admin/visitorRoutes');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Set up routes
router.use('/', authRoutes);
router.use('/admin', verifyAdmin, adminRoutes);
router.use('/settings', settingsRoutes);
router.use('/admin', adminRoutes);
router.use('/', userRoutes);
router.use('/payment', paymentRoutes);
router.use('/payment-gateway', paymentGatewayRoutes);
router.use('/product', productRoutes);
router.use('/addon', addonRoutes);
router.use('/upsell', upsellRoutes);
router.use('/subscription', subscriptionRoutes);

module.exports = router;
