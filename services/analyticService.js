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

module.exports={
    analytics,
    usersStatisticsAnalytics,
    exportAnalyticsData
}