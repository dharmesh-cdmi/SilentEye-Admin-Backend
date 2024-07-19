const { getOrders } = require('../../services/orderService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions

const getOrdersController = async (req, res) => {
    try {
        // Extract query parameters
        const { page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country,search} = req.query;

        // Call the service function
        const result = await getOrders({ page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country,search});

        return apiSuccessResponse(res, 'Orders retrieved successfully', result);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    getOrders: getOrdersController
};
