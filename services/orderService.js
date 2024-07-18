const Orders = require('../models/ordersModel');
const { getVisitorCount } = require('../services/visitorService');
const { getRefundData } = require('../services/refundService');



const getOrders = async ({ page = 1, limit = 10, status = 'Completed', paymentMethod, userId, planName, minAmount, maxAmount, startDate, endDate, country, search }) => {
    // Build the filter object
    let filter = {};

    // Filter by status
    if (status) {
        filter.status = new RegExp(status, 'i'); // Case insensitive search
    }

    // Filter by payment method
    if (paymentMethod) {
        filter.paymentMethod = new RegExp(paymentMethod, 'i'); // Case insensitive search
    }

    // Filter by user ID
    if (userId) {
        filter.userId = new RegExp(userId, 'i'); // Case insensitive search
    }

    // Filter by plan name
    if (planName) {
        filter['planDetails.planName'] = new RegExp(planName, 'i'); // Case insensitive search
    }

    // Filter by minimum amount
    if (minAmount) {
        filter['planDetails.amount'] = { $gte: Number(minAmount) };
    }

    // Filter by maximum amount
    if (maxAmount) {
        filter['planDetails.amount'] = filter['planDetails.amount'] || {};
        filter['planDetails.amount'].$lte = Number(maxAmount);
    }

    // Filter by start date
    if (startDate) {
        filter['orderDetails.purchase'] = { $gte: new Date(startDate) };
    }

    // Filter by end date
    if (endDate) {
        filter['orderDetails.purchase'] = filter['orderDetails.purchase'] || {};
        filter['orderDetails.purchase'].$lte = new Date(endDate);
    }

    // Filter by country
    if (country) {
        filter['orderDetails.country'] = new RegExp(country, 'i'); // Case insensitive search
    }

    // General search across multiple fields
    if (search) {
        const searchRegExp = new RegExp(search, 'i'); // Case insensitive search
        filter.$or = [
            { 'orderDetails.email': searchRegExp },
            { 'planDetails.planName': searchRegExp },
            { 'orderDetails.country': searchRegExp }
        ];
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

    // Get total add-on sales count and amount
    let pipeline = [
        { $unwind: "$addOns" }, // Unwind the addOns array
        { 
            $group: { 
                _id: null, 
                totalAddons: { $sum: 1 }, // Sum the count of addOns
                totalAddonAmount: { $sum: "$addOns.price" } // Sum the price of addOns
            } 
        }
    ];

    // Apply date filters to the pipeline if provided
    if (startDate && endDate) {
        pipeline.unshift({
            $match: {
                'orderDetails.purchase': {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        });
    } else if (startDate) {
        pipeline.unshift({
            $match: {
                'orderDetails.purchase': { $gte: new Date(startDate) }
            }
        });
    } else if (endDate) {
        pipeline.unshift({
            $match: {
                'orderDetails.purchase': { $lte: new Date(endDate) }
            }
        });
    }

    const result = await Orders.aggregate(pipeline);
    const totalAddonSales = result.length > 0 ? result[0].totalAddons : 0;
    const totalAddonAmount = result.length > 0 ? result[0].totalAddonAmount : 0;

    const totalAmounts = await getTotalAmounts(filter);

    // Get total unique visitors
    const uniqueVisitorsData = await getVisitorCount(null, null, startDate, endDate);
    const uniqueVisitorsCount = uniqueVisitorsData.totalVisitorsCount;

    // Get refund data
    const refundData = await getRefundData(startDate, endDate);

    // Calculate conversion rate
    const conversionRate = uniqueVisitorsCount > 0 ? (totalOrders / uniqueVisitorsCount) * 100 : 0;

    return {

            totalOrder: {
                count: totalOrders,
                amount: totalAmounts.totalOrderAmount
            },
            paymentInitiated: {
                count: pendingOrders,
                amount: totalAmounts.paymentInitiatedAmount
            },
            totalPurchaseUsers: {
                count: completedOrders,
                amount: totalAmounts.totalPurchaseAmount
            },
            refund: {
                count: refundedOrders,
                amount: totalAmounts.refundedAmount
            },
            totalAddonSales: {
                count: totalAddonSales,
                amount: totalAddonAmount
            },
            conversionRate,

        refundData
    };
};


const getTotalAmounts = async (filter) => {
    const totalOrderAmount = await Orders.aggregate([
        { $match: filter },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$planDetails.amount" }
            }
        }
    ]);

    const paymentInitiatedAmount = await Orders.aggregate([
        { $match: { ...filter, status: 'Pending' } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$planDetails.amount" }
            }
        }
    ]);

    const totalPurchaseAmount = await Orders.aggregate([
        { $match: { ...filter, status: 'Completed' } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$planDetails.amount" }
            }
        }
    ]);

    const refundedAmount = await Orders.aggregate([
        { $match: { ...filter, status: 'Refunded' } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$planDetails.amount" }
            }
        }
    ]);

    return {
        totalOrderAmount: totalOrderAmount.length > 0 ? totalOrderAmount[0].totalAmount : 0,
        paymentInitiatedAmount: paymentInitiatedAmount.length > 0 ? paymentInitiatedAmount[0].totalAmount : 0,
        totalPurchaseAmount: totalPurchaseAmount.length > 0 ? totalPurchaseAmount[0].totalAmount : 0,
        refundedAmount: refundedAmount.length > 0 ? refundedAmount[0].totalAmount : 0
    };
}; 

module.exports = {
    getOrders,
    getTotalOrderCount
};
