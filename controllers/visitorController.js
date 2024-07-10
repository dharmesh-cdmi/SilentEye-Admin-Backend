// controllers/visitorController.js

const Visitor = require('../models/visitorModel');

// Controller to log visitor data
const logVisitor = async (req, res) => {
  try {
    const { page, action, isVisit, country, device, IP } = req.body;
    const visitor = new Visitor({ page, action, isVisit, country, device, IP });
    await visitor.save();
    res.status(201).json({ message: 'Visitor data logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log visitor data' });
  }
};

// Controller to get visitor counts by page and action with date filter
const getVisitorCount = async (req, res) => {
  const { page, action, startDate, endDate } = req.query;

  try {
    let matchCondition = {};
    
    if (page) {
      matchCondition.page = new RegExp(`^${page}$`, 'i');
    }
    if (action) {
      matchCondition.action = new RegExp(`^${action}$`, 'i');
    }
    if (startDate && endDate) {
      matchCondition.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const count = await Visitor.countDocuments(matchCondition);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve visitor count' });
  }
};

// Controller to get visitor details with date filter
const getVisitorDetails = async (req, res) => {
  const { page, action, startDate, endDate } = req.query;

  try {
    let matchCondition = {};
    
    if (page) {
      matchCondition.page = new RegExp(`^${page}$`, 'i');
    }
    if (action) {
      matchCondition.action = new RegExp(`^${action}$`, 'i');
    }
    if (startDate && endDate) {
      matchCondition.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const result = await Visitor.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: { page: "$page", action: "$action" },
          totalCount: { $sum: 1 },
          countries: { $addToSet: "$country" },
          devices: { $addToSet: "$device" },
          ips: { $addToSet: "$IP" }
        }
      }
    ]);

    const response = result.map(item => ({
      page: item._id.page,
      action: item._id.action,
      totalCount: item.totalCount,
      countries: item.countries,
      devices: item.devices,
      ips: item.ips
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve visitor data' });
  }
};

module.exports={
  logVisitor,
  getVisitorCount,
  getVisitorDetails
}