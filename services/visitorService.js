const Visitor = require('../models/visitorModel');
const Login = require('../models/loginModel');

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
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      matchCondition.visitDate = {
        $gte: new Date(startDate)
      };
    } else if (endDate) {
      matchCondition.visitDate = {
        $lte: new Date(endDate)
      };
    }

    if (startDate && endDate) {
      matchCondition.visitDate.$lte.setHours(23, 59, 59, 999);
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


    // Aggregate to find unique visitors by IP and visit date
    const uniqueVisitor = await Visitor.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: { 
            visitorIP: "$visitorIP", 
            date: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } }
          },
          totalCount: { $sum: 1 },
        }
      }
    ]);

    const totalVisitorsCount = uniqueVisitor.length;

    const response = {
      totalVisitorsCount,
      visitorDetails: result.map(item => ({
        page: item._id.page,
        action: item._id.action,
        totalCount: item.totalCount,
      }))
    };

    return {
      statusCode: 200,
      message: 'Data Fetched successfully',
      data: response
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVisitorCount
};
