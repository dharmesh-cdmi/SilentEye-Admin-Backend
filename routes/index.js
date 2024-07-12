const express = require('express');
// const authRoutes = require('./authRoutes');
const settingsRoutes = require('./settingsRoutes');
const userRoutes = require('./authRoutes');
const paymentGatewayRoutes = require('./paymentGatewayRoutes');
const paymentRoutes = require('./paymentRoutes');
const productRoutes = require('./productRoutes');
const addonRoutes = require('./addonRoutes');
const upsellRoutes = require('./upsellRoutes');
const planRoutes = require('./planRoutes');
const shippingRoutes = require('./shippingRoutes');
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
router.use('/plan', planRoutes);
router.use('/tickets', require('./ticketRoutes'));
router.use('/managers', require('./managerRoutes'));
router.use('/shipping', shippingRoutes);

module.exports = router;
