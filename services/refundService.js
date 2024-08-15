const RefundRequest = require('../models/refundRequestModel');

const getRefundData = async (startDate = null, endDate = null) => {
  let matchCondition = {};

  if (startDate && endDate) {
    matchCondition.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  } else if (startDate) {
    matchCondition.createdAt = {
      $gte: new Date(startDate)
    };
  } else if (endDate) {
    matchCondition.createdAt = {
      $lte: new Date(endDate)
    };
  }

  const pipeline = [
    { $match: matchCondition },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        amount: { $sum: "$amount" } // Ensure this matches the field name in your documents
      }
    }
  ];

  const result = await RefundRequest.aggregate(pipeline);

  const refundData = result.reduce((acc, item) => {
    acc[item._id] = {
      count: item.count,
      amount: item.amount
    };
    return acc;
  }, {});

  const totalRefundRequestsCount = Object.values(refundData).reduce((acc, curr) => acc + curr.count, 0);
  const totalRefundRequestsAmount = Object.values(refundData).reduce((acc, curr) => acc + curr.amount, 0);

  return {
    totalRefundRequests: {
      count: totalRefundRequestsCount,
      amount: totalRefundRequestsAmount
    },
    trueRefunds: {
      count: refundData['True Refunded']?.count || 0,
      amount: refundData['True Refunded']?.amount || 0
    },
    refundRequests: {
      count: refundData['Pending']?.count || 0,
      amount: refundData['Pending']?.amount || 0
    },
    refunded: {
      count: refundData['Refunded']?.count || 0,
      amount: refundData['Refunded']?.amount || 0
    }
  };
};

const getApprovedRefundsByDateRange = async (startDate, endDate) => {
  return RefundRequest.aggregate([
    { 
      $match: { 
        // status: "Approved", 
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } 
      } 
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        count: { $sum: 1 }
      }
    }
  ]);
};



module.exports = {
  getRefundData,
  getApprovedRefundsByDateRange
};
