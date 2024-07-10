// routes/upsellRoutes.js

const express = require('express');
const router = express.Router();
const upsellController = require('../controllers/upsellController');

router.post('/', upsellController.createUpsell);
router.get('/', upsellController.getAllUpsells);
router.get('/:id', upsellController.getUpsellById);
router.put('/:id', upsellController.updateUpsell);
router.delete('/:id', upsellController.deleteUpsell);

module.exports = router;
