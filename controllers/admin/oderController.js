const { getOrders } = require('../../services/orderService');

const getOrdersController = async (req, res) => {
    try {
        // Extract query parameters
        const { page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate } = req.query;

        // Call the service function
        const result = await getOrders({ page, limit, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrders: getOrdersController
};
