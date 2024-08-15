const express = require('express');
const router = express.Router();
const refundSettingController = require('../controllers/refundSettingController');

// Get refund settings
router.get('/', refundSettingController.getRefundSetting);

// Upsert refund settings (create or update)
router.post('/', refundSettingController.upsertRefundSetting);

module.exports = router;
