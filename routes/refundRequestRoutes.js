// routes/refundRequestRoutes.js

const express = require('express');
const router = express.Router();
const refundRequestController = require('../controllers/refundRequestController');

router.post('/', refundRequestController.createRefundRequest);
router.get('/', refundRequestController.getAllRefundRequests);
router.get('/:id', refundRequestController.getRefundRequestById);
router.put('/:id', refundRequestController.updateRefundRequest);
router.delete('/:id', refundRequestController.deleteRefundRequest);

// Bulk update refund requests
router.put('/bulk-update', refundRequestController.bulkUpdateRefundRequests);

// Bulk delete refund requests
router.delete('/bulk-delete', refundRequestController.bulkDeleteRefundRequests);

module.exports = router;
