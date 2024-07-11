const orderService = require("./orderService");
const visitorService = require('../services/visitorService');
const loginService = require("./loginService");

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
    }
    return response;
}

module.exports={
    analytics
}