const express = require('express');
const router = express.Router();
const { getOrders } = require('../../controllers/admin/oderController');

// Route to fetch orders
router.get('/', getOrders);

module.exports = router;
