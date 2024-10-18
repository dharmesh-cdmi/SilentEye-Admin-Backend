// routes/refundRequestRoutes.js

const express = require('express');
const router = express.Router();
const refundRequestController = require('../controllers/refundRequestController');
const { verifyUserOrAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyUserOrAdmin, refundRequestController.createRefundRequest);
router.get('/', refundRequestController.getAllRefundRequests);
router.get('/userId', verifyUserOrAdmin, refundRequestController.getRefundRequestById);
// Bulk update refund requests
router.put('/bulk-update', refundRequestController.bulkUpdateRefundRequests);
router.put('/:id', refundRequestController.updateRefundRequest);
// Bulk delete refund requests
router.delete('/bulk-delete', refundRequestController.bulkDeleteRefundRequests);
router.delete('/:id', refundRequestController.deleteRefundRequest);

module.exports = router;
