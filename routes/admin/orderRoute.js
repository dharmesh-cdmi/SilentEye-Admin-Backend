const express = require('express');
const router = express.Router();
const { fetchOrders } = require('../../controllers/admin/oderController');

// Route to fetch orders
router.get('/', fetchOrders);

module.exports = router;
