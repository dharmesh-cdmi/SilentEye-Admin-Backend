const User = require('../models/userModel');

const getUserStatistics = async (startDate = null, endDate = null) => {
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
        $match: {
          "orders": { $ne: [] } // Ensure there are orders
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
          plan: { $arrayElemAt: ["$plan", 0] } // Extract the plan details
        }
      },
      {
        $group: {
          _id: "$orders.orderDetails.country", // Group by country
          sales: {
            $push: {
              totalSalesAmount: "$orders.orderDetails.total",
              totalUsersBought: 1 // Count each user once
            }
          },
          refund: {
            $push: {
              totalRefunds: { $cond: [{ $eq: ["$orders.status", "Refunded"] }, 1, 0] },
              totalRefundedAmount: "$orders.refundDetails.refundAmount"
            }
          },
          totalCheckout: {
            $sum: { $cond: [{ $eq: ["$orders.status", "Completed"] }, 1, 0] }
          },
          totalPaymentInitiated: {
            $sum: { $cond: [{ $eq: ["$orders.status", "Pending"] }, 1, 0] }
          },
          totalPlans: { $addToSet: "$plan._id" } // Collect all plan IDs associated with this group
        }
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          sales: {
            totalSalesAmount: { $sum: "$sales.totalSalesAmount" },
            totalUsersBought: { $sum: "$sales.totalUsersBought" }
          },
          refund: {
            totalRefunds: { $sum: "$refund.totalRefunds" },
            totalRefundedAmount: { $sum: "$refund.totalRefundedAmount" }
          },
          totalCheckout: 1,
          totalPaymentInitiated: 1,
          totalPlan: { $size: "$totalPlans" }
        }
      }
    );

    const result = await User.aggregate(pipeline);

    return result;
  } catch (error) {
    throw error;
  }
};



const getUserStatisticsByCountry = async (startDate = null, endDate = null) => {
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
        $match: {
          "orders": { $ne: [] } // Ensure there are orders
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
          plan: { $arrayElemAt: ["$plan", 0] } // Extract the plan details
        }
      },
      {
        $group: {
          _id: "$orders.orderDetails.country", // Group by country
          totalSalesAmount: { $sum: "$orders.orderDetails.total" },
          totalCheckout: {
            $sum: { $cond: [{ $eq: ["$orders.status", "Completed"] }, 1, 0] }
          },
          totalPaymentInitiated: {
            $sum: { $cond: [{ $eq: ["$orders.status", "Pending"] }, 1, 0] }
          },
          totalRefunds: {
            $sum: { $cond: [{ $eq: ["$orders.status", "Refunded"] }, 1, 0] }
          },
          totalRefundedAmount: {
            $sum: { $cond: [{ $eq: ["$orders.status", "Refunded"] }, "$orders.refundDetails.refundAmount", 0] }
          },
          totalPlan: { $sum: 1 }, // Count the number of plans
          plans: {
            $push: {
              planName: "$plan.name",
              planId: "$plan._id"
            }
          }
        }
      },
      {
        $project: {
          sales: {
            totalSalesAmount: "$totalSalesAmount",
            totalUsersBought: { $size: "$plans" }
          },
          refund: {
            totalRefunds: "$totalRefunds",
            totalRefundedAmount: "$totalRefundedAmount"
          },
          totalCheckout: 1,
          totalPaymentInitiated: 1,
          totalPlan: 1,
          country: "$_id",
          plans: 1,
          _id: 0
        }
      }
    );

    const result = await User.aggregate(pipeline);

    // Filter out any documents with _id set to null
    const filteredResult = result.filter(item => item.country !== null);

    return filteredResult;
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
  getUserStatistics,
  getUserStatisticsByCountry
};
