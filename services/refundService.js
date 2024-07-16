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

  const totalRefundRequests = await RefundRequest.countDocuments(matchCondition);

  const trueRefunds = await RefundRequest.countDocuments({
    ...matchCondition,
    status: 'True Refunded'
  });

  const refundRequests = await RefundRequest.countDocuments({
    ...matchCondition,
    status: { $in: ['Pending', 'Approved', 'Rejected'] }
  });

  const refunded = await RefundRequest.countDocuments({
    ...matchCondition,
    status: 'Refunded'
  });

  return {
    totalRefundRequests,
    trueRefunds,
    refundRequests,
    refunded
  };
};

module.exports = {
  getRefundData
};
