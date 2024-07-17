const orderService = require("./orderService");
const visitorService = require('../services/visitorService');
const loginService = require("./loginService");
const ticketService = require("./ticketService");
const contactFormService = require("./contactFormService");
const userService = require("./userService");

const analytics = async (addon = null, plan = null, page = null, action = null, startDate = null, endDate = null)=> {
    const visitorDetails = await visitorService.getVisitorCount(page, action, startDate, endDate);
    const totalLoggedInUser = await loginService.getLoginCount(startDate, endDate);
    const orders = await orderService.getTotalOrderCount(plan,startDate, endDate);
    // const conversion = await orderService.getTotalConversion(startDate, endDate);
    const totalSupportTicket = await ticketService.getTotalTicketsCount(startDate, endDate)
    const totalContactFormSubmited = await contactFormService.getTotalContactFormsCount(startDate, endDate)
    const response = {
        visitorDetails,
        totalLoggedInUser,
        orders,
        // conversion,
        totalSupportTicket,
        totalContactFormSubmited
    }
    return response;
}

const usersStatisticsAnalytics = async (startDate = null, endDate = null, groupBy = null, page = null, limit = null) => {
    let userStatistics;

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

    return {
        statusCode: 200,
        message: 'Data Fetched Successfully',
        data: response
      };;
};


module.exports={
    analytics,
    usersStatisticsAnalytics
}