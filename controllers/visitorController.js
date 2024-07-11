const visitorService = require('../services/visitorService');


// Controller to get visitor details
const getVisitorDetails = async (req, res) => {
  const { page, action, startDate, endDate } = req.query;

  try {
    const visitorDetails = await visitorService.getVisitorDetails(page, action, startDate, endDate);
    res.json(visitorDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve visitor data' });
  }
};

module.exports = {
  getVisitorDetails
};
