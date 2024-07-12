const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const oderController = require('../../controllers/admin/oderController');
const visitorController = require('../../controllers/visitorController'); 
const analyticsController = require('../../controllers/admin/analyticsController');


// Route to create a new admin
router.post('/', adminController.createAdmin);
router.get('/details', adminController.getAdminDetails);
router.use('/analytics', analyticsController.analytics);
router.use('/visitors/count', visitorController.getVisitorCount);
router.use('/orders',  oderController.getOrders);


module.exports = router;
