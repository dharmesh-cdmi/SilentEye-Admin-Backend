const RefundRequest = require('../models/refundRequestModel');

// Create a new refund request
const createRefundRequest = async (data) => {
  try {
    const refundRequest = new RefundRequest(data);
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
      populate: { path: 'planId', select: 'name' },
    };

    const query = {};
    if (filterStatus) query.status = filterStatus;
    if (search) {
      query.$or = [
        { requestId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
      ];
    }
    return await RefundRequest.paginate(query, options);
  } catch (error) {
    throw new Error(`Error in getting refund requests: ${error.message}`);
  }
};

// Get refund request by ID
const getRefundRequestById = async (id) => {
  try {
    return await RefundRequest.findById(id).populate('planId', 'name');
  } catch (error) {
    throw new Error(`Error in getting refund request: ${error.message}`);
  }
};

// Update refund request by ID
const updateRefundRequest = async (id, data) => {
  try {
    let refundRequest = await getRefundRequestById(id);
    if (!refundRequest) {
      throw new Error('Refund Request not found!');
    }

    return await RefundRequest.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Error in updating refund request: ${error.message}`);
  }
};

// Bulk update refund requests
const bulkUpdateRefundRequests = async (ids, data) => {
  try {
    return await RefundRequest.updateMany(
      { _id: { $in: ids } },
      { $set: data },
      { multi: true, new: true }
    );
  } catch (error) {
    throw new Error(`Error in bulk updating refund requests: ${error.message}`);
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

// Bulk delete refund requests
const bulkDeleteRefundRequests = async (ids) => {
  try {
    return await RefundRequest.deleteMany({ _id: { $in: ids } });
  } catch (error) {
    throw new Error(`Error in bulk deleting refund requests: ${error.message}`);
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
};
