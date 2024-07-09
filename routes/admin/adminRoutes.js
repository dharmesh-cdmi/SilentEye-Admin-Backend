// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { createAdmin, getAdminDetails } = require('../../controllers/admin/adminController');
const visitorRoutes = require('./visitorRoutes');
const orderRoutes = require('./orderRoute');

// Route to create a new admin
router.post('/', createAdmin);
router.get('/details', getAdminDetails);
router.use('/visitors', visitorRoutes);
router.use('/orders', orderRoutes);


module.exports = router;
 