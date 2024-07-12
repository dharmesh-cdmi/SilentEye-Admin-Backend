const orderService = require("./orderService");
const visitorService = require('../services/visitorService');
const loginService = require("./loginService");
const ticketService = require("./ticketService");
const contactFormService = require("./contactFormService");
const userService = require("./userService");

const analytics = async (addon = null, plan = null, page = null, action = null, startDate = null, endDate = null)=> {
    const visitorDetails = await visitorService.getVisitorCount(page, action, startDate, endDate);
    const totalLoggedInUser = await loginService.getLoginCount(startDate, endDate);
    const totalOrder = await orderService.getTotalOrderCount(plan,startDate, endDate);
    const totalSupportTicket = await ticketService.getTotalTicketsCount(startDate, endDate)
    const totalContactFormSubmited = await contactFormService.getTotalContactFormsCount(startDate, endDate)
    const response = {
        visitorDetails,
        totalLoggedInUser,
        totalOrder,
        totalSupportTicket,
        totalContactFormSubmited
    }
    return response;
}
const usersStatisticsAnalytics = async (startDate = null, endDate = null) =>{
    const userStatistics = await userService.getUserStatistics(startDate, endDate);
    const response = {
        userStatistics,
    }
    return response;
}

module.exports={
    analytics,
    usersStatisticsAnalytics
}