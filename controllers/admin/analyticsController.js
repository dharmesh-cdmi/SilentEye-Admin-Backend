const moment = require('moment');

const analyticService = require('../../services/analyticService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions
const exportService = require('../../services/exportService');
const fs = require('fs');

const totalCountAnalytics = async (req, res) => {
    const {plan, page, action } = req.query;
    let { startDate = null, endDate = null } = req.query;
     // Validate date formats
     startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
     endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
 

    try {
        const analytic = await analyticService.analytics(plan, page, action, startDate, endDate);

        return apiSuccessResponse(res, 'Total count analytics retrieved successfully', analytic);
    } catch (error) {
        // console.log(error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const usersStatisticsAnalytics = async (req, res) => {
    const { groupBy, page, limit } = req.query;
    let { startDate = null, endDate = null } = req.query;
     // Validate date formats
     startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
     endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
 

    try {
        const analytic = await analyticService.usersStatisticsAnalytics(startDate, endDate, groupBy, page, limit);

        return apiSuccessResponse(res, 'Users statistics analytics retrieved successfully', analytic);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};


const downloadUserStatistics = async (req, res) => {
    try {
        const { format,addon, plan, page, action} = req.query; // 'pdf' or 'xlsx'
        let { startDate = null, endDate = null } = req.query;
        // Validate date formats
        startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
        endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
 
        
        // if (!format || (format !== 'pdf' && format !== 'xlsx')) {
        //     return res.status(400).send('Invalid format. Must be "pdf" or "xlsx".');
        // }

        const data = await analyticService.exportAnalyticsData(plan, page, action, startDate, endDate);
        const filePath = await exportService.exportData(format || 'xlsx', data);

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



    const { format,groupBy, page, limit } = req.query;
    let { startDate = null, endDate = null } = req.query;
     // Validate date formats
     startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
     endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
 

    try {
        const analyticData = await analyticService.usersStatisticsAnalytics(startDate, endDate, groupBy, page, limit);

        const filePath = await exportService.exportUserStatisticData(format || 'xlsx', analyticData);
        
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

        // return apiSuccessResponse(res, 'Users statistics analytics retrieved successfully', analytic);
    } catch (error) {
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};


const downloadAnalytics = async (req, res) => {
    try {
        const { format,addon, plan, page, action} = req.query; // 'pdf' or 'xlsx'
        let { startDate = null, endDate = null } = req.query;
        // Validate date formats
        startDate = startDate && moment(startDate, moment.ISO_8601, true).isValid() ? startDate : null;
        endDate = endDate && moment(endDate, moment.ISO_8601, true).isValid() ? endDate : null;
 
        
        // if (!format || (format !== 'pdf' && format !== 'xlsx')) {
        //     return res.status(400).send('Invalid format. Must be "pdf" or "xlsx".');
        // }

        const data = await analyticService.exportAnalyticsData(plan, page, action, startDate, endDate);
        const filePath = await exportService.exportData(format || 'xlsx', data);

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
    downloadUserStatistics,
    downloadAnalytics
};
