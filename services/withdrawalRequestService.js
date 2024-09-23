const dotenv = require('dotenv');
const User = require('../models/userModel');
const Plan = require('../models/planModel');
const WithdrawalRequest = require('../models/withdrawalRequestModel');
dotenv.config();

// Create a new withdrawal request
const createWithdrawalRequest = async (data) => {
  try {
    const withdrawalRequest = new WithdrawalRequest(data);
    await withdrawalRequest.save();
    return withdrawalRequest;
  } catch (error) {
    throw new Error(`Error in creating withdrawal request: ${error.message}`);
  }
};

// Get all withdrawal requests
const getAllWithdrawalRequests = async (page, limit, search, filterStatus) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: { path: 'user', select: 'name' },
    };

    return await WithdrawalRequest.paginate({}, options);
  } catch (error) {
    throw new Error(`Error in getting withdrawal requests: ${error.message}`);
  }
};

// Get withdrawal request by ID
const getWithdrawalRequestById = async (id) => {
  try {
    return await WithdrawalRequest.findById(id).populate('user', 'name');
  } catch (error) {
    throw new Error(`Error in getting refund request: ${error.message}`);
  }
};

const updateWithdrawalStatuses = async () => {
  try {
    // Convert the time interval to milliseconds
    const timeInterval =
      parseInt(process.env.STATUS_UPDATE_INTERVAL, 10) * 60 * 1000;

    const now = new Date();
    const statusTransitions = [
      { from: 'Pending', to: 'Approved' },
      // { from: 'Approved', to: 'Under Processing' },
      // { from: 'Under Processing', to: 'Initiated' },
      // { from: 'Initiated', to: 'Refunded' },
    ];

    for (const transition of statusTransitions) {
      const withdrawalRequests = await WithdrawalRequest.find({
        status: transition.from,
        updatedAt: { $lte: new Date(now.getTime() - timeInterval) },
      });

      for (const request of withdrawalRequests) {
        request.status = transition.to;

        if (transition.to === 'Approved') {
          const user = await User.findById(request.user);

          if (user && user?.walletAmount > request.amount) {
            user.walletAmount -= request.amount;
            await user.save();
          }
        }

        await request.save();
      }
    }

    console.log('Withdrawal statuses updated successfully.');
  } catch (error) {
    console.error(`Error in updating refund statuses: ${error.message}`);
  }
};

module.exports = {
  createWithdrawalRequest,
  getAllWithdrawalRequests,
  getWithdrawalRequestById,
  updateWithdrawalStatuses,
};
