const analyticService = require('../../services/analyticService');

const analytics = async (req, res)=>{
    const { addon, plan, page, action, startDate, endDate } = req.query;

    try {
        const analytic = await analyticService.analytics(addon, plan, page, action, startDate, endDate);

        res.json(analytic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    analytics
}