const RefundRequest = require("../models/refundRequestModel");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Plan = require("../models/planModel");
const ordersModel = require("../models/ordersModel");
dotenv.config();

const createRefundRequest = async (data, userId) => {
  try {
    // Find the latest order for the user
    const latestOrder = await ordersModel
      .findOne({ userId: userId, status: "Completed" })
      .sort({
        createdAt: -1,
      });
    if (!latestOrder) {
      throw new Error("No order found for this user");
    }
    const planId = latestOrder.planDetails.planId;
    const refundRequestData = {
      ...data,
      plan: planId,
      user: userId,
    };
    const refundRequest = new RefundRequest(refundRequestData);
    await refundRequest.save();
    return refundRequest;
  } catch (error) {
    throw new Error(`Error in creating refund request: ${error.message}`);
  }
};

// Get all refund requests
const getAllRefundRequests = async (page, limit, search, filterStatus) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: { path: "plan", select: "name amount" },
    };

    const query = {};
    if (filterStatus) query.status = filterStatus;
    if (search) {
      query.$or = [
        // { requestId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: "i" } },
        // { type: { $regex: search, $options: 'i' } },
      ];
    }
    return await RefundRequest.paginate(query, options);
  } catch (error) {
    throw new Error(`Error in getting refund requests: ${error.message}`);
  }
};

// Get refund request by ID
const getRefundRequestById = async (userId) => {
  try {
    return await RefundRequest.find({ user: userId }).populate(
      "plan",
      "name amount"
    );
  } catch (error) {
    throw new Error(`Error in getting refund request: ${error.message}`);
  }
};

// Bulk update refund requests
const bulkUpdateRefundRequests = async (ids, data) => {
  try {
    // // Ensure the length of ids and data arrays are the same
    // if (ids.length !== data.length) {
    //   throw new Error('The length of ids and data arrays must be the same.');
    // }

    // const operations = ids.map((id, index) => ({
    //   updateOne: {
    //     filter: { _id: id },
    //     update: { $set: data[index] },
    //     upsert: false, // set to true if you want to create new documents if they don't exist
    //   },
    // }));

    // return await RefundRequest.bulkWrite(operations);

    const operations = [];

    // Loop through each refund request id and corresponding data
    for (let i = 0; i < ids.length; i++) {
      const refundRequest = await RefundRequest.findById(ids[i])
        .populate("plan")
        .populate("user");

      if (!refundRequest) {
        throw new Error(`Refund request with id ${ids[i]} not found.`);
      }

      // Check if the status is being updated to "Refunded"
      if (
        data[i].status === "Refunded" &&
        refundRequest.plan &&
        refundRequest.user
      ) {
        const user = await User.findById(refundRequest.user._id);
        const plan = await Plan.findById(refundRequest.plan._id);

        if (user && plan) {
          // Add the plan amount to the user's wallet
          user.walletAmount += plan.amount;
          await user.save(); // Save the updated wallet amount
        } else {
          throw new Error("User or Plan not found for refund request.");
        }
      }

      // Add the bulk update operation for each refund request
      operations.push({
        updateOne: {
          filter: { _id: ids[i] },
          update: { $set: data[i] },
          upsert: false, // Set to true if you want to create new documents if they don't exist
        },
      });
    }

    // Execute the bulkWrite operation
    return await RefundRequest.bulkWrite(operations);
  } catch (error) {
    throw new Error(`Error in bulk updating refund requests: ${error.message}`);
  }
};

// Update refund request by ID
const updateRefundRequest = async (id, data) => {
  try {
    let refundRequest = await getRefundRequestById(id);
    if (!refundRequest) {
      throw new Error("Refund Request not found!");
    }

    await RefundRequest.findByIdAndUpdate(id, data, { new: true });

    if (data?.status && data?.status === "Refunded") {
      const user = await User.findById(refundRequest.user);
      const plan = await Plan.findById(refundRequest.plan);

      // Add the plan amount to the user's wallet if both user and plan exist
      if (user && plan) {
        user.walletAmount += plan.amount;
        await user.save(); // Save the updated wallet amount
      }
    }

    return await getRefundRequestById(id);
  } catch (error) {
    throw new Error(`Error in updating refund request: ${error.message}`);
  }
};

// Bulk delete refund requests
const bulkDeleteRefundRequests = async (ids) => {
  try {
    return await RefundRequest.deleteMany({ _id: { $in: ids } });
  } catch (error) {
    throw new Error(`Error in bulk deleting refund requests: ${error.message}`);
  }
};

// Delete refund request by ID
const deleteRefundRequest = async (id) => {
  try {
    return await RefundRequest.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error in deleting refund request: ${error.message}`);
  }
};

const updateRefundStatuses = async () => {
  try {
    // Convert the time interval to milliseconds
    const timeInterval =
      parseInt(process.env.STATUS_UPDATE_INTERVAL, 10) * 60 * 1000;

    const now = new Date();
    const statusTransitions = [
      { from: "Pending", to: "Approved" },
      { from: "Approved", to: "Under Processing" },
      { from: "Under Processing", to: "Initiated" },
      { from: "Initiated", to: "Refunded" },
    ];

    for (const transition of statusTransitions) {
      const refundRequests = await RefundRequest.find({
        status: transition.from,
        updatedAt: { $lte: new Date(now.getTime() - timeInterval) },
      });

      for (const request of refundRequests) {
        request.status = transition.to;

        if (transition.to === "Refunded") {
          const user = await User.findById(request.user);
          const plan = await Plan.findById(request.plan);

          // Add the plan amount to the user's wallet if both user and plan exist
          if (user && plan) {
            user.walletAmount += plan.amount;
            await user.save(); // Save the updated wallet amount
          }
        }

        await request.save();
      }
    }

    console.log("Refund statuses updated successfully.");
  } catch (error) {
    console.error(`Error in updating refund statuses: ${error.message}`);
  }
};

module.exports = {
  createRefundRequest,
  getAllRefundRequests,
  getRefundRequestById,
  updateRefundRequest,
  bulkUpdateRefundRequests,
  deleteRefundRequest,
  bulkDeleteRefundRequests,
  updateRefundStatuses,
};
