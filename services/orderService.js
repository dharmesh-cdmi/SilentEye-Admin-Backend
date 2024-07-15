const Orders = require('../models/ordersModel');

const getOrders = async ({ page = 1, limit = 10, status, paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate }) => {
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

    return {
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Number(page),
        totalOrders: totalCount,
        orders
    };
};



const getTotalOrderCount = async (plan = null, startDate = null, endDate = null) => {
    let filter = {};

    // Plan filter
    if (plan) {
        filter['planDetails.planName'] = new RegExp(plan, 'i'); // Case insensitive search
    }

    // Date filters
    if (startDate) {
        filter['orderDetails.purchase'] = { $gte: new Date(startDate) };
    }

    if (endDate) {
        filter['orderDetails.purchase'] = filter['orderDetails.purchase'] || {};
        filter['orderDetails.purchase'].$lte = new Date(endDate);
    }

    // Get total count for orders
    const totalOrders = await Orders.countDocuments(filter);

    // Get total count for pending orders
    const pendingOrders = await Orders.countDocuments({
        ...filter,
        status: 'Pending'
    });

    // Get total count for completed orders
    const completedOrders = await Orders.countDocuments({
        ...filter,
        status: 'Completed'
    });

    // Get total count for refunded orders
    const refundedOrders = await Orders.countDocuments({
        ...filter,
        status: 'Refunded'
    });

    // Get total addon sales count
    let pipeline = [
        { $unwind: "$addOns" }, // Unwind the addOns array
        { $group: { _id: null, totalAddons: { $sum: 1 } } } // Sum the count of addOns
    ];

    // Apply date filters to the pipeline if provided
    if (startDate && endDate) {
        pipeline.unshift({ $match: {
            'orderDetails.purchase': {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }});
    } else if (startDate) {
        pipeline.unshift({ $match: {
            'orderDetails.purchase': { $gte: new Date(startDate) }
        }});
    } else if (endDate) {
        pipeline.unshift({ $match: {
            'orderDetails.purchase': { $lte: new Date(endDate) }
        }});
    }

    const result = await Orders.aggregate(pipeline);
    const totalAddonSales = result.length > 0 ? result[0].totalAddons : 0;

    return {
        totalOrders,
        paymentInitiated: pendingOrders,
        totalPurchase: completedOrders,
        trueRefund: refundedOrders,
        totalAddonSales
    };
};



module.exports = {
    getOrders,
    getTotalOrderCount
};
