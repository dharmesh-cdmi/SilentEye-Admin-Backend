const Visitor = require('../models/visitorModel');

// Service function to get visitor count
const getVisitorCount = async (page = null, action = null, startDate = null, endDate = null) => {
  try {
    // Create the match condition dynamically based on the provided filters
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
        $lte: new Date(endDate).setHours(23, 59, 59, 999)
      };
    } else if (startDate) {
      matchCondition.visitDate = {
        $gte: new Date(startDate)
      };
    } else if (endDate) {
      matchCondition.visitDate = {
        $lte: new Date(endDate).setHours(23, 59, 59, 999)
      };
    }

    const result = await Visitor.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: { page: "$page", action: "$action" },
          totalCount: { $sum: 1 },
          ids: { $addToSet: "$_id" },
          visitDates: { $addToSet: "$visitDate" }
        }
      }
    ]);

    const totalVisitorsCount = await Visitor.countDocuments(matchCondition);

    const response = {
      totalVisitorsCount,
      details: result.map(item => ({
        // ids: item.ids,
        page: item._id.page,
        action: item._id.action,
        totalCount: item.totalCount,
        // visitDates: item.visitDates,
      }))
    };

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVisitorCount
};
