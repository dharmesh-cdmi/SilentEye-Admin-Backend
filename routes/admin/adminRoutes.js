const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const oderController = require('../../controllers/admin/oderController');
const visitorController = require('../../controllers/visitorController');
const analyticsController = require('../../controllers/admin/analyticsController');
const validationMiddleware = require('../../middleware/validationMiddleware');
const userSchemas = require('../../validation/userSchemas');

// Route to create a new admin
router.post('/', adminController.createAdmin);
router.get('/details', adminController.getAdminDetails);
router.use('/analytics', analyticsController.totalCountAnalytics);
router.use('/users-statistics', analyticsController.usersStatisticsAnalytics);
router.get('/download-analytics', analyticsController.downloadAnalytics);
router.use('/visitors/count', visitorController.getVisitorCount);
router.use('/orders', oderController.getOrders);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminController.changePassword
);

module.exports = router;
