const User = require('../models/userModel');

const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserStatistics = async (startDate = null, endDate = null) => {
  try {
    const matchStage = {};

    if (startDate) {
      matchStage.createdAt = { ...matchStage.createdAt, $gte: new Date(startDate) };
    }

    if (endDate) {
      matchStage.createdAt = { ...matchStage.createdAt, $lte: new Date(endDate) };
    }

    const pipeline = [];
    if (startDate || endDate) {
      pipeline.push({ $match: matchStage });
    }

    pipeline.push(
      {
        $group: {
          _id: "$userDetails.country", // Assuming you have a "country" field in your userDetails model
          totalUsers: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          totalUsers: 1
        }
      }
    );

    const result = await User.aggregate(pipeline);
    return result;
  } catch (error) {
    throw error;
  }
};





module.exports = {
  getUserProfile,
  getUserStatistics
};
