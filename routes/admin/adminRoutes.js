const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const orderController = require('../../controllers/admin/orderController');
const visitorController = require('../../controllers/visitorController');
const analyticsController = require('../../controllers/admin/analyticsController');
const validationMiddleware = require('../../middleware/validationMiddleware');
const userSchemas = require('../../validation/userSchemas');

// Route to create a new admin
router.post('/', adminController.createAdmin);
router.get('/details', adminController.getAdminDetails);

//visitors
router.get('/analytics', analyticsController.totalCountAnalytics);
router.get('/users-statistics', analyticsController.usersStatisticsAnalytics);
router.post('/download-users-statistics', analyticsController.downloadUserStatistics);
router.get('/download-analytics', analyticsController.downloadAnalytics);
router.get('/visitors/count', visitorController.getVisitorCount);

//orders
// Route to create a new order
router.post('/order/create', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:orderId', orderController.getOrdersDetails);
router.post('/order/:orderId/refund-initiate', orderController.initiateRefund);
router.delete('/orders-delete/:orderId', orderController.deleteOrders);
router.get('/download-orders', orderController.downloadorderDetails);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminController.changePassword
);

module.exports = router;
