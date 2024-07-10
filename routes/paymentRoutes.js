// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

console.log('Payment routes loaded');

router.post(
  '/create-checkout-session',
  paymentController.createCheckoutSession
);
router.post('/create-stripe-product', paymentController.createStripeProduct);
router.post('/create-stripe-addon', paymentController.createStripeProduct);
router.post('/create-stripe-plan', paymentController.createStripePlan);

module.exports = router;
