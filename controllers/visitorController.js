const visitorService = require('../services/visitorService');

// Controller to get visitor details
const getVisitorCount = async (req, res) => {
  const { page, action, startDate, endDate } = req.query;

  try {
    const visitorDetails = await visitorService.getVisitorCount(page, action, startDate, endDate);
    res.json(visitorDetails);
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    res.status(500).json({ error: 'Failed to retrieve visitor data' });
  }
};

module.exports = {
  getVisitorCount
};
