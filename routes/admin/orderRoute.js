const express = require('express');
const router = express.Router();
const oderController = require('../../controllers/admin/oderController');

// Route to fetch orders
router.get('/', oderController.getOrders);

module.exports = router;
