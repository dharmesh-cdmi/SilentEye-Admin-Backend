const moment = require('moment');

const orderService = require("./orderService");
const visitorService = require('../services/visitorService');
const loginService = require("./loginService");
const ticketService = require("./ticketService");
const contactFormService = require("./contactFormService");
const userService = require("./userService");
const exportService = require('./exportService');



const analytics = async (plan = null, page = [], action = [], startDate = null, endDate = null)=> {

     // Validate date formats
     startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
     endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
 

    const visitorDetails = await visitorService.getVisitorCount(startDate, endDate);
    const graphData = await visitorService.graphData(page, action, startDate, endDate);
    const totalLoggedInUser = await loginService.getLoginCount(startDate, endDate);
    const orders = await orderService.getTotalOrderCount(plan,startDate, endDate);
    const totalSupportTicket = await ticketService.getTotalTicketsCount(startDate, endDate)
    const totalContactFormSubmited = await contactFormService.getTotalContactFormsCount(startDate, endDate)
    const response = {
        graphData,
        visitorDetails,
        totalLoggedInUser,
        orders,
        totalSupportTicket,
        totalContactFormSubmited
    }
    return response;
}

const usersStatisticsAnalytics = async (startDate = null, endDate = null, groupBy = null, page, limit) => {
    let userStatistics;

         // Validate date formats
         startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
         endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
     
    
    if (groupBy === 'plan') {
        userStatistics = await userService.getUserStatistics(startDate, endDate, page, limit);
    } else if (groupBy === 'country') {
        userStatistics = await userService.getUserStatisticsByCountry(startDate, endDate, page, limit);
    } else {
        throw new Error('Invalid groupBy parameter. Must be "plan" or "country".');
    }

    const response = {
        userStatistics,
    };

    return response;
};


const exportAnalyticsData = async (plan = null, page = [], action = [], startDate = null, endDate = null)=> {

    // Validate date formats
    startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
    endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;


   const visitorDetails = await visitorService.getVisitorCount(startDate, endDate);
   const totalLoggedInUser = await loginService.getLoginCount(startDate, endDate);
   const orders = await orderService.getTotalOrderCount(plan,startDate, endDate);
   const totalSupportTicket = await ticketService.getTotalTicketsCount(startDate, endDate)
   const totalContactFormSubmited = await contactFormService.getTotalContactFormsCount(startDate, endDate)
   const response = {
       visitorDetails,
       totalLoggedInUser,
       orders,
       totalSupportTicket,
       totalContactFormSubmited
   }

   return response;
}


// const exportAnalyticsData = async (req, res) => {
//     try {
//         const { format, plan = null, page = null, action = null } = req.query;
//         let { startDate = null, endDate = null } = req.query;
//         // Validate date formats
//         startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
//         endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
    

//         if (!format || (format !== 'pdf' && format !== 'xlsx')) {
//             return res.status(400).send('Invalid format. Must be "pdf" or "xlsx".');
//         }

//         // Fetch data from the analytics service
//         const data = await analytics(plan, page, action,startDate,endDate);

//         if (!data || typeof data !== 'object') {
//             return res.status(400).send('Invalid data. Must be a non-empty object.');
//         }

//         const filePath = await exportService.exportData(format, data);

//         res.download(filePath, (err) => {
//             if (err) {
//                 console.error('Error downloading file:', err);
//                 res.status(500).send('Error downloading file.');
//             } else {
//                 // Optional: Delete the file after download
//                 fs.unlink(filePath, (err) => {
//                     if (err) {
//                         console.error('Error deleting file:', err);
//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error generating export data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

module.exports={
    analytics,
    usersStatisticsAnalytics,
    exportAnalyticsData
}