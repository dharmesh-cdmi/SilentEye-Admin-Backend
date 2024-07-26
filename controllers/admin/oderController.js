const orderService = require('../../services/orderService');
const exportService = require('../../services/exportService');

const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions

const getOrdersController = async (req, res) => {
    try {
        // Extract query parameters
        const { page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country,search,orderId} = req.query;

        // Call the service function
        const result = await orderService.getOrders({ page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country,search,orderId});

        return apiSuccessResponse(res, 'Orders retrieved successfully', result);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getOrdersDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        // Call the service function
        const result = await orderService.getOrderDetails(orderId);

        return apiSuccessResponse(res, 'Orders Details retrieved successfully', result);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const downloadorderDetails = async (req, res) => {
    try {
        // Extract query parameters
        const { page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country, search } = req.query;

        // Call the service function to get the orders
        const { orders } = await orderService.getOrders({ page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country, search });

        // Export to Excel
        const buffer = await exportService.exportOrdersToExcel(orders);

        // Set headers and send the file
        res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const deleteOrders = async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await orderService.deleteOrder(orderId);

        if (result.error) {
            const statusCode = result.error === 'Order not found' || result.error === 'Order already deleted' ? 400 : 500;
            return res.status(statusCode).json({ message: result.error, error: null });
        }

        return apiSuccessResponse(res, 'Orders Delete successfully');
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};



module.exports = {
    getOrders: getOrdersController,
    getOrdersDetails,
    downloadorderDetails,
    deleteOrders
};
