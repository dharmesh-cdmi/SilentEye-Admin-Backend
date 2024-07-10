// routes/paymentGatewayRoutes.js

const express = require('express');
const router = express.Router();
const paymentGatewayController = require('../controllers/paymentGatewayController');

router.post('/', paymentGatewayController.createPaymentGateway);
router.get('/', paymentGatewayController.getAllPaymentGateways);
router.get('/:id', paymentGatewayController.getPaymentGatewayById);
router.put('/:id', paymentGatewayController.updatePaymentGateway);
router.delete('/:id', paymentGatewayController.deletePaymentGateway);

module.exports = router;
