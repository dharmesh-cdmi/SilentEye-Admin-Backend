// routes/withdrawalRequestRoutes.js

const express = require('express');
const router = express.Router();
const withdrawalRequestController = require('../controllers/withdrawalRequestController');

router.post('/', withdrawalRequestController.createWithdrawalRequest);
router.get('/', withdrawalRequestController.getAllWithdrawalRequests);
router.get('/:id', withdrawalRequestController.getWithdrawalRequestById);

module.exports = router;
