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
router.get('/analytics', analyticsController.totalCountAnalytics);
router.get('/users-statistics', analyticsController.usersStatisticsAnalytics);
router.get('/download-analytics', analyticsController.downloadAnalytics);
router.get('/visitors/count', visitorController.getVisitorCount);
router.get('/orders', oderController.getOrders);
router.get('/orders/:orderId', oderController.getOrdersDetails);
router.delete('/orders-delete/:orderId', oderController.deleteOrders);
router.get('/download-orders', oderController.downloadorderDetails);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminController.changePassword
);

module.exports = router;
