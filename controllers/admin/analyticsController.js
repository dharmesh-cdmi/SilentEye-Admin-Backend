const analyticService = require('../../services/analyticService');

const totalCountAnalytics = async (req, res)=>{
    const { addon, plan, page, action, startDate, endDate } = req.query;

    try {
        const analytic = await analyticService.analytics(addon, plan, page, action, startDate, endDate);

        res.json(analytic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const usersStatisticsAnalytics = async (req, res)=>{
    const {startDate, endDate, groupBy } = req.query;

    try {
        const analytic = await analyticService.usersStatisticsAnalytics(startDate, endDate, groupBy);

        res.json(analytic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    totalCountAnalytics,
    usersStatisticsAnalytics
}