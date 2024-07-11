const Visitor = require('../models/visitorModel');

// Service function to get visitor details
const getVisitorDetails = async (page, action, startDate, endDate) => {
  try {
    let matchCondition = {};

    if (page) {
      matchCondition.page = new RegExp(`^${page}$`, 'i');
    }
    if (action) {
      matchCondition.action = new RegExp(`^${action}$`, 'i');
    }
    if (startDate && endDate) {
      matchCondition.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const result = await Visitor.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: { page: "$page", action: "$action" },
          totalCount: { $sum: 1 },
          countries: { $addToSet: "$country" },
          devices: { $addToSet: "$device" },
          ips: { $addToSet: "$IP" }
        }
      }
    ]);

    const response = result.map(item => ({
      page: item._id.page,
      action: item._id.action,
      totalCount: item.totalCount,
      countries: item.countries,
      devices: item.devices,
      ips: item.ips
    }));

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  logVisitor,
  getVisitorCount,
  getVisitorDetails
};
