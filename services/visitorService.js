const Visitor = require('../models/visitorModel');

const getVisitorCount = async (startDate = null, endDate = null) => {
  try {

    // Create the match condition dynamically based on the provided filters
    let matchCondition = {};

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

    const pipeline = [];

    // Add match stage only if there are filter conditions
    if (Object.keys(matchCondition).length > 0) {
      pipeline.push({ $match: matchCondition });
    }

    // Grouping stage to get visitor details
    pipeline.push({
      $group: {
        _id: { page: "$page", action: "$action" },
        totalCount: { $sum: 1 },
        ids: { $addToSet: "$_id" },
        visitDates: { $addToSet: "$visitDate" }
      }
    });

    // Execute the aggregation pipeline
    const result = await Visitor.aggregate(pipeline);

    // Calculate total unique visitors
    const uniqueVisitor = await Visitor.aggregate([
      ...pipeline,
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
    
    // Calculate total visitors count
    const totalVisitorsCount = uniqueVisitor.length;

    // Prepare response
    const response = {
      totalVisitorsCount,
      pageData: result.map(item => ({
        page: item._id.page,
        action: item._id.action,
        totalCount: item.totalCount,
      }))
    };

    return response;
  } catch (error) {
    throw error;
  }
};


const graphData = async (pages = [], actions = [], startDate = null, endDate = null) => {
  try {
    // Ensure pages and actions are arrays
    if (typeof pages === 'string') {
      pages = JSON.parse(pages.replace(/'/g, '"'));
    }
    pages = Array.isArray(pages) ? pages : [pages];
    
    if (typeof actions === 'string') {
      actions = JSON.parse(actions.replace(/'/g, '"'));
    }
    actions = Array.isArray(actions) ? actions : [actions];

    // Create the match condition dynamically based on the provided filters
    let matchCondition = {};

    if (pages.length > 0) {
      matchCondition.page = { $in: pages.map(page => new RegExp(`^${page}$`, 'i')) };
    }
    if (actions.length > 0) {
      matchCondition.action = { $in: actions.map(action => new RegExp(`^${action}$`, 'i')) };
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

    const pipeline = [];

    // Add match stage only if there are filter conditions
    if (Object.keys(matchCondition).length > 0) {
      pipeline.push({ $match: matchCondition });
    }

    // Grouping stage to get visitor details
    pipeline.push({
      $group: {
        _id: { page: "$page", action: "$action" },
        totalCount: { $sum: 1 },
        ids: { $addToSet: "$_id" },
        visitDates: { $addToSet: "$visitDate" }
      }
    });

    // Execute the aggregation pipeline
    const result = await Visitor.aggregate(pipeline);


    // Prepare response
    const response = 
      result.map(item => ({
        page: item._id.page,
        action: item._id.action,
        totalCount: item.totalCount,
      }))
    

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVisitorCount,
  graphData
};
