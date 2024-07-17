const analyticService = require('../../services/analyticService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions

const totalCountAnalytics = async (req, res) => {
    const { addon, plan, page, action, startDate, endDate } = req.query;

    try {
        const analytic = await analyticService.analytics(addon, plan, page, action, startDate, endDate);

        return apiSuccessResponse(res, 'Total count analytics retrieved successfully', analytic);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const usersStatisticsAnalytics = async (req, res) => {
    const { startDate, endDate, groupBy, page, limit } = req.query;

    try {
        const analytic = await analyticService.usersStatisticsAnalytics(startDate, endDate, groupBy, page, limit);

        return apiSuccessResponse(res, 'Users statistics analytics retrieved successfully', analytic);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    totalCountAnalytics,
    usersStatisticsAnalytics
};
