const orderService = require("./orderService");
const visitorService = require('../services/visitorService');
const loginService = require("./loginService");
<<<<<<< HEAD
const ticketService = require("./ticketService");
const contactFormService = require("./contactFormService");

const analytics = async(addon = null, plan = null, page = null, action = null, startDate = null, endDate = null)=> {
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
=======

const analytics = async(addon = null, plan = null, page = null, action = null, startDate = null, endDate = null)=> {
    const visitorDetails = await visitorService.getVisitorCount(page, action, startDate, endDate);
    const loginsCount = await loginService.getLoginCount(startDate, endDate);
    const totalOrder = await orderService.getTotalOrderCount(plan,startDate, endDate);
    const totalAddon = await orderService.getTotalAddonSales(addon,startDate, endDate);
    const response = {
        visitorDetails,
        loginsCount,
        totalOrder,
        totalAddon
>>>>>>> 89c5b8e8dc9eaf4ba0be1a051de9dc1e20ce4689
    }
    return response;
}

module.exports={
    analytics
}