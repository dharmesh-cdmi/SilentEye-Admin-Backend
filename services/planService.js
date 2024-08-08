const Plan = require('../models/planModel');
const paymentService = require('./paymentService');

// Create a new plan
const createPlan = async (data) => {
  try {
    const pgData = {
      paymentGatewayId: data?.paymentGatewayId,
      name: data?.name,
      amount: data?.mrp,
      currency: 'usd',
      description: `${data?.discountPercent}% OFF`,
      images: [data?.icon],
    };

    const pgPlan = await paymentService.createStripeItem(pgData);

    data = {
      ...data,
      paymentGatewayId: data?.paymentGatewayId,
      pgPlanId: pgPlan?.data?.product,
      pgPriceId: pgPlan?.data?.id,
    };

    const plan = new Plan(data);
    await plan.save();

    return {
      status: true,
      data: plan,
      message: 'Plan created successfully',
    };
  } catch (error) {
    return {
      status: false,
      error: true,
      message: 'Error in creating plan: ' + error,
    };
  }
};

// Get all plans
const getAllPlans = async (page, limit, search) => {
  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };
    // Create a query object
    const query = {};

    // If a search term is provided, add it to the query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } },
      ];
    }

    return await Plan.paginate(query, options);
  } catch (error) {
    throw new Error(`Error fetching plans: ${error.message}`);
  }
};

// Get plan by ID
const getPlanById = async (id) => {
  try {
    return await Plan.findById(id);
  } catch (error) {
    throw new Error(`Error fetching plan: ${error.message}`);
  }
};

// Update plan by ID
const updatePlan = async (id, data) => {
  try {
    let plan = await getPlanById(id);

    const pgData = {
      paymentGatewayId: plan?.paymentGatewayId,
      itemId: plan?.pgPlanId,
      name: data?.name,
      description: data?.description ? data?.description : plan.description,
      itemMetadata: data?.planMetadata ? data.planMetadata : undefined,
      priceId: plan?.pgPriceId,
      amount: data?.mrp ? data.mrp : undefined,
      priceMetadata: data?.priceMetadata ? data.priceMetadata : undefined,
    };

    const pgPlan = await paymentService.updateStripeItem(pgData);

    if (!pgPlan) {
      throw new Error('Plan not updated on stripe!');
    }

    plan = await Plan.findByIdAndUpdate(id, data, {
      new: true,
    });
    return plan;
  } catch (error) {
    throw new Error(`Error updating plan: ${error.message}`);
  }
};

// Delete plan by ID
const deletePlan = async (id) => {
  try {
    let plan = await getPlanById(id);
    if (!plan) {
      throw new Error('Plan not found!');
    }

    const pgData = {
      paymentGatewayId: plan?.paymentGatewayId,
      itemId: plan?.pgPlanId,
    };

    const pgPlan = await paymentService.deleteStripeItem(pgData);

    if (!pgPlan) {
      throw new Error('Plan not deleted on stripe!');
    }

    plan = await Plan.findByIdAndDelete(id);

    return {
      status: true,
      data: plan,
      message: 'Plan deleted successfully',
    };
  } catch (error) {
    return {
      status: false,
      error: true,
      message: 'Error in deleting plan: ' + error,
    };
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
