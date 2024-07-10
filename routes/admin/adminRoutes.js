// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const visitorRoutes = require('./visitorRoutes');
const orderRoutes = require('./orderRoute');

// Route to create a new admin
router.post('/', adminController.createAdmin);
router.get('/details', adminController.getAdminDetails);
router.use('/visitors', visitorRoutes);
router.use('/orders', orderRoutes);


module.exports = router;
 