const Visitor = require('../models/visitorModel');
const orderService = require('./orderService');
const refundService = require('./refundService');
const loginService = require('./loginService');

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


// const graphData = async (pages = [], actions = [], startDate = null, endDate = null) => {
//   try {
//     // Ensure pages and actions are arrays
//     if (typeof pages === 'string') {
//       pages = JSON.parse(pages.replace(/'/g, '"'));
//     }
//     pages = Array.isArray(pages) ? pages : [pages];
    
//     if (typeof actions === 'string') {
//       actions = JSON.parse(actions.replace(/'/g, '"'));
//     }
//     actions = Array.isArray(actions) ? actions : [actions];

//     // Create the match condition dynamically based on the provided filters
//     let matchCondition = {};

//     if (pages.length > 0) {
//       matchCondition.page = { $in: pages.map(page => new RegExp(`^${page}$`, 'i')) };
//     }
//     if (actions.length > 0) {
//       matchCondition.action = { $in: actions.map(action => new RegExp(`^${action}$`, 'i')) };
//     }
//     if (startDate && endDate) {
//       matchCondition.visitDate = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       };
//     } else if (startDate) {
//       matchCondition.visitDate = {
//         $gte: new Date(startDate)
//       };
//     } else if (endDate) {
//       matchCondition.visitDate = {
//         $lte: new Date(endDate)
//       };
//     }

//     if (startDate && endDate) {
//       matchCondition.visitDate.$lte.setHours(23, 59, 59, 999);
//     }

//     const pipeline = [];

//     // Add match stage only if there are filter conditions
//     if (Object.keys(matchCondition).length > 0) {
//       pipeline.push({ $match: matchCondition });
//     }

//     // Grouping stage to get visitor details
//     pipeline.push({
//       $group: {
//         _id: { page: "$page", action: "$action" },
//         totalCount: { $sum: 1 },
//         ids: { $addToSet: "$_id" },
//         visitDates: { $addToSet: "$visitDate" }
//       }
//     });

//     // Execute the aggregation pipeline
//     const result = await Visitor.aggregate(pipeline);


//     // Prepare response
//     const response = 
//       result.map(item => ({
//         page: item._id.page,
//         action: item._id.action,
//         totalCount: item.totalCount,
//       }))
    

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };



const graphData = async (pages = [], actions = [], startDate = null, endDate = null) => {
  // const LABELS = {
  //   CHECKOUT_PAGE_VISITOR: "Checkout Page Visitor",
  //   PLAN_PAGE_VISITOR: "Plan Page Visitor",
  //   DEMO_VIEWER: "Demo Viewer",
  //   LOGGED_IN_USERS: "Logged in Users",
  //   TOTAL_ORDER: "Total Order",
  //   TOTAL_REFUNDS: "Total Refunds"
  // };
  
  try {
    // Parse and validate pages and actions
    if (typeof pages === 'string') {
      pages = JSON.parse(pages.replace(/'/g, '"'));
    }
    pages = Array.isArray(pages) ? pages : [pages];
    
    if (typeof actions === 'string') {
      actions = JSON.parse(actions.replace(/'/g, '"'));
    }
    actions = Array.isArray(actions) ? actions : [actions];

    // Define default date range
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(new Date().setFullYear(end.getFullYear() - 1));

    
    // Define match condition for MongoDB aggregation
    const matchCondition = {
      visitDate: { $gte: start, $lte: end }
    };

    // MongoDB aggregation pipeline
    const pipeline = [
      { $match: matchCondition },
      {
        $group: {
          _id: {
            month: { $month: "$visitDate" },
            year: { $year: "$visitDate" },
            page: "$page",
            action: "$action"
          },
          totalCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          page: "$_id.page",
          action: "$_id.action",
          totalCount: 1
        }
      }
    ];

    // Fetch data
    const visitorResult = await Visitor.aggregate(pipeline);



    const orderData = await orderService.getOrdersByDateRange(start, end);
    const refundData = await refundService.getApprovedRefundsByDateRange(start, end);
    const loginResult = await loginService.getLoginDataByDateRange(start, end);
      

    // Initialize aggregated data
    const aggregatedData = {
      "Checkout Page Visitor": Array(12).fill(0),
      "Plan Page Visitor": Array(12).fill(0),
      "Demo Viewer": Array(12).fill(0),
      "Logged in Users": Array(12).fill(0),
      "Total Order": Array(12).fill(0),
      "Total Refunds": Array(12).fill(0)
    };

      // Process login data
      loginResult.forEach(item => {
        if (item._id.action === 'Login') {
          const monthIndex = item._id.month - 1; // 0-based index
          aggregatedData["Logged in Users"][monthIndex] += item.totalCount;
        }
      });

      

    // Process visitor data
    visitorResult.forEach(item => {
      const label = item.action === 'Visit' && item.page === 'Checkout'
        ? "Checkout Page Visitor"
        : item.action === 'Visit' && item.page === 'Plan'
        ? "Plan Page Visitor"
        : item.action === 'Demo'
        ? "Demo Viewer"
        : item.action === 'Login'
        ? "Logged in Users"
        : null;
        // const data = item.totalCount;

      if (label) {
        const monthIndex = item.month - 1; // 0-based index
        aggregatedData[label][monthIndex] += item.totalCount;
      }
    });

    // Process order data
    orderData.forEach(order => {
      const monthIndex = order._id.month - 1; // 0-based index
      aggregatedData["Total Order"][monthIndex] += order.totalCount;
    });

    // Process refund data
    refundData.forEach(refund => {
      const monthIndex = refund._id.month - 1; // 0-based index
      aggregatedData["Total Refunds"][monthIndex] += refund.count;
    });

    // Format the result with 'label' and 'data' keys
    const result = [
      { label: "Checkout Page Visitor", data: aggregatedData["Checkout Page Visitor"] },
      { label: "Plan Page Visitor", data: aggregatedData["Plan Page Visitor"] },
      { label: "Demo Viewer", data: aggregatedData["Demo Viewer"] },
      { label: "Logged in Users", data: aggregatedData["Logged in Users"] },
      { label: "Total Order", data: aggregatedData["Total Order"] },
      { label: "Total Refunds", data: aggregatedData["Total Refunds"] },
      { label: "Months",data:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
    ];

    return result;
  } catch (error) {
    throw error;
  }
};







module.exports = {
  getVisitorCount,
  graphData
};
