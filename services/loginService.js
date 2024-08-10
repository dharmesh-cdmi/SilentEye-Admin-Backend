const Login = require('../models/loginModel'); // Adjust the path as needed

const logUserLogin = async (email, userId, country, device, IP) => {
  try {
    const login = new Login({
      email,
      userId,
      country,
      device,
      IP,
    });

    await login.save();
  } catch (error) {
    console.error('Error logging user login:', error);
  }
};


const getLoginCount = async (startDate = null, endDate = null) => {
  try {

     let matchCondition = {};
     if (startDate && endDate) {
       matchCondition.loggedInAt = {
         $gte: new Date(startDate),
         $lte: new Date(endDate)
       };
     } else if (startDate) {
       matchCondition.loggedInAt = {
         $gte: new Date(startDate)
       };
     } else if (endDate) {
       matchCondition.loggedInAt = {
         $lte: new Date(endDate)
       };
     }
 
     if (startDate && endDate) {
       matchCondition.loggedInAt.$lte.setHours(23, 59, 59, 999);
     }

    const loginCountResult = await Login.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 }
        }
      }
    ]);

    return (loginCountResult.length > 0) ? loginCountResult[0].totalCount : 0;
  } catch (error) {
    throw error;
  }
};



const getLoginDataByDateRange = async (startDate, endDate) => {
  try {
    return await Login.aggregate([
      {
        $match: {
          loggedInAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$loggedInAt" },
            year: { $year: "$loggedInAt" }
          },
          totalCount: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
  } catch (error) {
    throw error;
  }
};



module.exports = {
  logUserLogin,
  getLoginCount,
  getLoginDataByDateRange
};
