// routes/refundRequestRoutes.js

const express = require('express');
const router = express.Router();
const refundRequestController = require('../controllers/refundRequestController');

router.post('/', refundRequestController.createRefundRequest);
router.get('/', refundRequestController.getAllRefundRequests);
router.get('/:id', refundRequestController.getRefundRequestById);
router.put('/:id', refundRequestController.updateRefundRequest);
router.delete('/:id', refundRequestController.deleteRefundRequest);

module.exports = router;
