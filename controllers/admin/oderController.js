const Orders = require('../../models/ordersModel');

const getOrders = async (req, res) => {
    try {
        // Extract query parameters
        const { page = 1, limit = 10, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate } = req.query;

        // Build the filter object
        let filter = {};

        if (status) {
            filter.status = new RegExp(status, 'i'); // Case insensitive search
        }

        if (paymentMethod) {
            filter.paymentMethod = new RegExp(paymentMethod, 'i'); // Case insensitive search
        }

        if (userId) {
            filter.userId = new RegExp(userId, 'i'); // Case insensitive search
        }

        if (planName) {
            filter['planDetails.planName'] = new RegExp(planName, 'i'); // Case insensitive search
        }

        if (minAmount) {
            filter['planDetails.amount'] = { $gte: Number(minAmount) };
        }

        if (maxAmount) {
            filter['planDetails.amount'] = filter['planDetails.amount'] || {};
            filter['planDetails.amount'].$lte = Number(maxAmount);
        }

        if (startDate) {
            filter['orderDetails.purchase'] = { $gte: new Date(startDate) };
        }

        if (endDate) {
            filter['orderDetails.purchase'] = filter['orderDetails.purchase'] || {};
            filter['orderDetails.purchase'].$lte = new Date(endDate);
        }

        // Fetch orders with pagination
        const orders = await Orders.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        // Get total count for pagination
        const totalCount = await Orders.countDocuments(filter);

        res.status(200).json({
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Number(page),
            totalOrders: totalCount,
            orders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getOrders
}