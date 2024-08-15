const visitorService = require('../services/visitorService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils'); // Importing helper functions

// Controller to get visitor details
const getVisitorCount = async (req, res) => {
  const {startDate, endDate } = req.query;

  try {
    const visitorDetails = await visitorService.getVisitorCount(startDate, endDate);
    return apiSuccessResponse(res, 'Visitor details retrieved successfully', visitorDetails);
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    return apiErrorResponse(res, 'Failed to retrieve visitor data', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getVisitorCount
};
