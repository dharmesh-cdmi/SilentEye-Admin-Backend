const analyticService = require('../../services/analyticService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions
const exportService = require('../../services/exportService');
const fs = require('fs');

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



const downloadAnalytics = async (req, res) => {
    try {
        const { format,addon, plan, page, action, startDate, endDate} = req.query; // 'pdf' or 'xlsx'
        if (!format || (format !== 'pdf' && format !== 'xlsx')) {
            return res.status(400).send('Invalid format. Must be "pdf" or "xlsx".');
        }

        const data = await analyticService.analytics(addon, plan, page, action, startDate, endDate);
        const filePath = await exportService.exportData(format, data);

        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file.');
            } else {
                // Optional: Delete the file after download
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error generating analytics data:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    totalCountAnalytics,
    usersStatisticsAnalytics,
    downloadAnalytics
};
