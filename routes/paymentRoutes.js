// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

console.log('Payment routes loaded'); // Add this line for debugging

router.post(
  '/create-checkout-session',
  paymentController.createCheckoutSession // Ensure this matches the exported name
);

module.exports = router;
