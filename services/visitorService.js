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

    const response = {
      totalVisitorsCount,
      pageData: result.map(item => {
        // let label = `${item._id.page} Page ${item._id.action}`;
        if (item._id.action === 'Visit') {
          label = `${item._id.page} Page Visitor`;
        } else if(item._id.action === 'Demo'){
          label = `${item._id.action} Viewer`;
        }
        else{
          label = `${item._id.page} Page`;
        }
        return {
          page: item._id.page,
          action: item._id.action,
          label: label,
          totalCount: item.totalCount,
        };
      })
    };
    

    return response;
  } catch (error) {
    throw error;
  }
};



// const graphData = async (pages = [], actions = [], startDate = null, endDate = null) => {
  
//   try {
//     // Parse and validate pages and actions
//     if (typeof pages === 'string') {
//       pages = JSON.parse(pages.replace(/'/g, '"'));
//     }
//     pages = Array.isArray(pages) ? pages : [pages];
    
//     if (typeof actions === 'string') {
//       actions = JSON.parse(actions.replace(/'/g, '"'));
//     }
//     actions = Array.isArray(actions) ? actions : [actions];

//     // Define default date range
//     const end = endDate ? new Date(endDate) : new Date();
//     const start = startDate ? new Date(startDate) : new Date(new Date().setFullYear(end.getFullYear() - 1));

    
//     // Define match condition for MongoDB aggregation
//     const matchCondition = {
//       visitDate: { $gte: start, $lte: end }
//     };

//     // MongoDB aggregation pipeline
//     const pipeline = [
//       { $match: matchCondition },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$visitDate" },
//             year: { $year: "$visitDate" },
//             page: "$page",
//             action: "$action"
//           },
//           totalCount: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           month: "$_id.month",
//           year: "$_id.year",
//           page: "$_id.page",
//           action: "$_id.action",
//           totalCount: 1
//         }
//       }
//     ];

//     // Fetch data
//     const visitorResult = await Visitor.aggregate(pipeline);



//     const orderData = await orderService.getOrdersByDateRange(start, end);
//     const refundData = await refundService.getApprovedRefundsByDateRange(start, end);
//     const loginResult = await loginService.getLoginDataByDateRange(start, end);
      

//     // Initialize aggregated data
//     const aggregatedData = {
//       "Checkout Page Visitor": Array(12).fill(0),
//       "Plan Page Visitor": Array(12).fill(0),
//       "Demo Viewer": Array(12).fill(0),
//       "Logged in Users": Array(12).fill(0),
//       "Total Order": Array(12).fill(0),
//       "Total Refunds": Array(12).fill(0)
//     };

//       // Process login data
//       loginResult.forEach(item => {
//         if (item._id.action === 'Login') {
//           const monthIndex = item._id.month - 1; // 0-based index
//           aggregatedData["Logged in Users"][monthIndex] += item.totalCount;
//         }
//       });

      

//     // Process visitor data
//     visitorResult.forEach(item => {
//       const label = item.action === 'Visit' && item.page === 'Checkout'
//         ? "Checkout Page Visitor"
//         : item.action === 'Visit' && item.page === 'Plan'
//         ? "Plan Page Visitor"
//         : item.action === 'Demo'
//         ? "Demo Viewer"
//         : item.action === 'Login'
//         ? "Logged in Users"
//         : null;
//         // const data = item.totalCount;

//       if (label) {
//         const monthIndex = item.month - 1; // 0-based index
//         aggregatedData[label][monthIndex] += item.totalCount;
//       }
//     });

//     // Process order data
//     orderData.forEach(order => {
//       const monthIndex = order._id.month - 1; // 0-based index
//       aggregatedData["Total Order"][monthIndex] += order.totalCount;
//     });

//     // Process refund data
//     refundData.forEach(refund => {
//       const monthIndex = refund._id.month - 1; // 0-based index
//       aggregatedData["Total Refunds"][monthIndex] += refund.count;
//     });

//     // Format the result with 'label' and 'data' keys
//     const result = [
//       { label: "Checkout Page Visitor", data: aggregatedData["Checkout Page Visitor"] },
//       { label: "Plan Page Visitor", data: aggregatedData["Plan Page Visitor"] },
//       { label: "Demo Viewer", data: aggregatedData["Demo Viewer"] },
//       { label: "Logged in Users", data: aggregatedData["Logged in Users"] },
//       { label: "Total Order", data: aggregatedData["Total Order"] },
//       { label: "Total Refunds", data: aggregatedData["Total Refunds"] },
//     ];

//     return {
//       result,
//       "Months":["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      
//     };
//   } catch (error) {
//     throw error;
//   }
// };

const moment = require('moment'); // Ensure moment.js is installed

const graphData = async (pages = [], actions = [], startDate = null, endDate = null) => {
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
    const end = endDate ? moment(endDate) : moment();
    const start = startDate ? moment(startDate) : moment().subtract(1, 'year');

    // Calculate the difference in days between startDate and endDate
    const diffDays = end.diff(start, 'days'); // Get the difference in days

    // Generate labels dynamically based on the selected date range
    let labels = [];
    let groupByField = {};

    if (diffDays <= 30) {
      // If it's a week or less, group by days
      let current = start.clone();
      while (current <= end) {
        labels.push(current.format('ddd')); // Day names (e.g., 'Mon')
        current.add(1, 'day');
      }
      groupByField = { dayOfWeek: { $dayOfWeek: "$visitDate" } };
    } else if (diffDays <= 365) {
      // If it's less than or equal to a year, group by months
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let current = start.clone().startOf('month');
      while (current <= end) {
        labels.push(current.format('MMM')); // Month names (e.g., 'Jan')
        current.add(1, 'month');
      }
      groupByField = { month: { $month: "$visitDate" } };
    } else {
      // If it's more than a year, group by years
      let current = start.clone().startOf('year');
      while (current <= end) {
        labels.push(current.format('YYYY')); // Year names (e.g., '2023')
        current.add(1, 'year');
      }
      groupByField = { year: { $year: "$visitDate" } };
    }

    // Define match condition for MongoDB aggregation
    const matchCondition = {
      visitDate: { $gte: start.toDate(), $lte: end.toDate() }
    };

    // MongoDB aggregation pipeline for visitorResult
    const pipeline = [
      { $match: matchCondition },
      {
        $group: {
          _id: groupByField,
          totalCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          group: "$_id",
          totalCount: 1
        }
      }
    ];

    // Fetch data
    const visitorResult = await Visitor.aggregate(pipeline);
    const orderData = await orderService.getOrdersByDateRange(start.toDate(), end.toDate());
    const refundData = await refundService.getApprovedRefundsByDateRange(start.toDate(), end.toDate());
    const loginResult = await loginService.getLoginDataByDateRange(start.toDate(), end.toDate());

    // Initialize aggregated data with the same length as labels
    const aggregatedData = {
      "Checkout Page Visitor": Array(labels.length).fill(0),
      "Plan Page Visitor": Array(labels.length).fill(0),
      "Demo Viewer": Array(labels.length).fill(0),
      "Logged in Users": Array(labels.length).fill(0),
      "Total Order": Array(labels.length).fill(0),
      "Total Refunds": Array(labels.length).fill(0)
    };

    // Process visitor data
    visitorResult.forEach(item => {
      const label = item.group.page === 'Checkout'
        ? "Checkout Page Visitor"
        : item.group.page === 'Plan'
        ? "Plan Page Visitor"
        : item.group.action === 'Demo'
        ? "Demo Viewer"
        : item.group.action === 'Login'
        ? "Logged in Users"
        : null;

      if (label) {
        let index = -1;
        if (groupByField.year) {
          index = labels.indexOf(item.group.year.toString());
        } else if (groupByField.month) {
          index = labels.indexOf(moment().month(item.group.month - 1).format('MMM'));
        } else if (groupByField.dayOfWeek) {
          index = labels.indexOf(moment().day(item.group.dayOfWeek - 1).format('ddd'));
        }
        if (index !== -1) {
          aggregatedData[label][index] += item.totalCount;
        }
      }
    });

    // Process order and refund data
    orderData.forEach(order => {
      const dateLabel = groupByField.year
        ? order._id.year.toString()
        : groupByField.month
        ? moment().month(order._id.month - 1).format('MMM')
        : moment().day(order._id.dayOfWeek - 1).format('ddd');
      const index = labels.indexOf(dateLabel);
      if (index !== -1) {
        aggregatedData["Total Order"][index] += order.totalCount;
      }
    });

    refundData.forEach(refund => {
      const dateLabel = groupByField.year
        ? refund._id.year.toString()
        : groupByField.month
        ? moment().month(refund._id.month - 1).format('MMM')
        : moment().day(refund._id.dayOfWeek - 1).format('ddd');
      const index = labels.indexOf(dateLabel);
      if (index !== -1) {
        aggregatedData["Total Refunds"][index] += refund.count;
      }
    });

    // Format the result with 'label' and 'data' keys
    const result = [
      { label: "Checkout Page Visitor", data: aggregatedData["Checkout Page Visitor"] },
      { label: "Plan Page Visitor", data: aggregatedData["Plan Page Visitor"] },
      { label: "Demo Viewer", data: aggregatedData["Demo Viewer"] },
      { label: "Logged in Users", data: aggregatedData["Logged in Users"] },
      { label: "Total Order", data: aggregatedData["Total Order"] },
      { label: "Total Refunds", data: aggregatedData["Total Refunds"] }
    ];

    return { result, labels }; // Return the dynamic labels based on the selected date range
  } catch (error) {
    console.error("Error in graphData:", error);
    throw error;
  }
};







module.exports = {
  getVisitorCount,
  graphData
};
