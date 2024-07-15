const User = require('../models/userModel');
// const Orders = require('../models/ordersModel');
// const Plan = require('../models/planModel');

const getUserStatistics = async (startDate = null, endDate = null, groupBy = 'country') => {
  try {
    const matchStage = {};

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const pipeline = [];

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Lookup stage to fetch orders and their associated plans
    pipeline.push(
      {
        $lookup: {
          from: "orders", // Collection name for orders
          localField: "_id",
          foreignField: "userId",
          as: "orders"
        }
      },
      {
        $unwind: {
          path: "$orders",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "plans", // Collection name for plans
          localField: "orders.planDetails.planId",
          foreignField: "_id",
          as: "plan"
        }
      },
      {
        $addFields: {
          demoPlanId: { $arrayElemAt: ["$plan._id", 0] } // Extract demo plan ID
        }
      }
    );

    // Grouping logic based on the parameter
    let groupStage;
    if (groupBy === 'country') {
      groupStage = {
        _id: "$userDetails.country",
        totalUsers: { $sum: 1 },
        demoUsers: { $sum: { $cond: [{ $eq: ["$activePlanId", "$demoPlanId"] }, 1, 0] } },
        totalSalesAmount: { $sum: "$orders.orderDetails.total" },
        totalPlansBought: { $sum: 1 },
        totalCheckout: { $sum: { $cond: [{ $eq: ["$orders.status", "Pending"] }, 1, 0] } },
        totalPaymentInitiated: { $sum: { $cond: [{ $in: ["$orders.status", ["Pending", "Completed"]] }, 1, 0] } },
        totalRefund: { $sum: { $cond: [{ $in: ["$orders.status", ["Refunded"]] }, 1, 0] } }
      };
    } else if (groupBy === 'plan') {
      groupStage = {
        _id: "$plan._id",
        totalUsers: { $sum: 1 },
        demoUsers: { $sum: { $cond: [{ $eq: ["$activePlanId", "$demoPlanId"] }, 1, 0] } },
        totalSalesAmount: { $sum: "$orders.orderDetails.total" },
        totalPlansBought: { $sum: 1 },
        totalCheckout: { $sum: { $cond: [{ $eq: ["$orders.status", "Pending"] }, 1, 0] } },
        totalPaymentInitiated: { $sum: { $cond: [{ $in: ["$orders.status", ["Pending", "Completed"]] }, 1, 0] } },
        totalRefund: { $sum: { $cond: [{ $in: ["$orders.status", ["Refunded"]] }, 1, 0] } }
      };
    }

    pipeline.push({ $group: groupStage });

    // Projection stage to format the output
    pipeline.push({
      $project: {
        _id: 0,
        groupByValue: "$_id",
        totalUsers: 1,
        demoUsers: 1,
        totalSalesAmount: 1,
        totalPlansBought: 1,
        totalCheckout: 1,
        totalPaymentInitiated: 1,
        totalRefund: 1
      }
    });

    const result = await User.aggregate(pipeline);
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserProfile,
  getUserStatistics
};
