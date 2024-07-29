const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const getUserStatistics = async (startDate = null, endDate = null) => {
    try {
        const matchStage = {};

        if (startDate || endDate) {
            matchStage.createdAt = {};
            if (startDate) matchStage.createdAt.$gte = new Date(startDate);
            if (endDate) matchStage.createdAt.$lte = new Date(endDate);
        }

        const pipeline = [];

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // Lookup stage to fetch orders and their associated plans
        pipeline.push(
            {
                $lookup: {
                    from: "orders", // Collection name for orders
                    localField: "_id",
                    foreignField: "userId",
                    as: "orders"
                }
            },
            {
                $unwind: {
                    path: "$orders",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "orders": { $ne: [] } // Ensure there are orders
                }
            },
            {
                $lookup: {
                    from: "plans", // Collection name for plans
                    localField: "orders.planDetails.planId",
                    foreignField: "_id",
                    as: "plan"
                }
            },
            {
                $addFields: {
                    plan: { $arrayElemAt: ["$plan", 0] } // Extract the plan details
                }
            },
            {
                $group: {
                    _id: "$plan._id", // Group by plan ID
                    planName: { $first: "$plan.name" },
                    totalSalesAmount: { $sum: "$orders.orderDetails.total" },
                    users: {
                        $push: {
                            userId: "$_id",
                            orderAmount: "$orders.orderDetails.total", // Include order amount
                            refunds: {
                                $cond: [{ $eq: ["$orders.status", "Refunded"] }, {
                                    refundId: "$orders.refundDetails.refundRequestId",
                                    refundedAmount: "$orders.refundDetails.refundAmount"
                                }, null]
                            }
                        }
                    },
                    totalUsersRefunds: {
                        $sum: {
                            $cond: [{ $eq: ["$orders.status", "Refunded"] }, 1, 0]
                        }
                    },
                    totalRefundedAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$orders.status", "Refunded"] }, "$orders.refundDetails.refundAmount", 0]
                        }
                    },
                    totalCheckout: {
                        $sum: { $cond: [{ $eq: ["$orders.status", "Completed"] }, 1, 0] }
                    },
                    totalPaymentInitiated: {
                        $sum: { $cond: [{ $eq: ["$orders.status", "Pending"] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    planName: 1,
                    sales: {
                        totalSalesAmount: "$totalSalesAmount",
                        totalUsersBought: { $size: "$users" }
                    },
                    refund: {
                        totalUsersRefunds: "$totalUsersRefunds",
                        totalRefundedAmount: "$totalRefundedAmount"
                    },

                    // totalSalesAmount: 1,
                    // totalUsersBought: { $size: "$users" }, // Count unique users who bought the plan
                    // totalUsersRefunds: 1,
                    // totalRefundedAmount: 1,
                    totalCheckout: 1,
                    totalPaymentInitiated: 1,
                    // users: 1 // Include the array of user details with order amount and refunds
                }
            }
        );

        const result = await User.aggregate(pipeline);

        // Filter out any documents with _id set to null
        const filteredResult = result.filter(item => item._id !== null);

        return {
            statusCode: 200,
            message: 'User statistics fetched successfully',
            data: filteredResult
        };
    } catch (error) {
        throw error;
    }
};


const getUserStatisticsByCountry = async (startDate = null, endDate = null) => {
    try {
        const matchStage = {};

        if (startDate || endDate) {
            matchStage.createdAt = {};
            if (startDate) matchStage.createdAt.$gte = new Date(startDate);
            if (endDate) matchStage.createdAt.$lte = new Date(endDate);
        }

        const pipeline = [];

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // Lookup stage to fetch orders and their associated plans
        pipeline.push(
            {
                $lookup: {
                    from: "orders", // Collection name for orders
                    localField: "_id",
                    foreignField: "userId",
                    as: "orders"
                }
            },
            {
                $unwind: {
                    path: "$orders",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "orders": { $ne: [] } // Ensure there are orders
                }
            },
            {
                $lookup: {
                    from: "plans", // Collection name for plans
                    localField: "orders.planDetails.planId",
                    foreignField: "_id",
                    as: "plan"
                }
            },
            {
                $addFields: {
                    plan: { $arrayElemAt: ["$plan", 0] } // Extract the plan details
                }
            },
            {
                $group: {
                    _id: "$orders.orderDetails.country", // Group by country
                    totalSalesAmount: { $sum: "$orders.orderDetails.total" },
                    totalCheckout: {
                        $sum: { $cond: [{ $eq: ["$orders.status", "Completed"] }, 1, 0] }
                    },
                    totalPaymentInitiated: {
                        $sum: { $cond: [{ $eq: ["$orders.status", "Pending"] }, 1, 0] }
                    },
                    totalRefunds: {
                        $sum: { $cond: [{ $eq: ["$orders.status", "Refunded"] }, 1, 0] }
                    },
                    totalRefundedAmount: {
                        $sum: { $cond: [{ $eq: ["$orders.status", "Refunded"] }, "$orders.refundDetails.refundAmount", 0] }
                    },
                    totalPlan: { $sum: 1 }, // Count the number of plans
                    plans: {
                        $push: {
                            planName: "$plan.name",
                            planId: "$plan._id"
                        }
                    }
                }
            },
            {
                $project: {
                    sales: {
                        totalSalesAmount: "$totalSalesAmount",
                        totalUsersBought: { $size: "$plans" }
                    },
                    refund: {
                        totalRefunds: "$totalRefunds",
                        totalRefundedAmount: "$totalRefundedAmount"
                    },
                    totalCheckout: 1,
                    totalPaymentInitiated: 1,
                    totalPlan: 1,
                    country: "$_id",
                    plans: 1,
                    _id: 0
                }
            }
        );

        const result = await User.aggregate(pipeline);

        // Filter out any documents with _id set to null
        const filteredResult = result.filter(item => item.country !== null);

        return {
            statusCode: 200,
            message: 'User statistics fetched successfully',
            data: filteredResult
        };
    } catch (error) {
        throw error;
    }
};


const fetchAllUsers = async (queryParams) => {
    const {
        page = 1,
        limit = 10,
        fromDate,
        toDate,
        dateFilter,
        status,
        userStatus,
        blocked,
        country,
        process,
        search,
        visitors = false
    } = queryParams;

    const filters = {};

    if (!visitors) {
        filters.userStatus = { $ne: 'Visitor' };
    }

    // Date range filtering
    if (fromDate || toDate || dateFilter) {
        const dateFilterConditions = [];

        if (dateFilter) {
            const today = new Date();
            const startOfToday = new Date(today.setHours(0, 0, 0, 0));
            const endOfToday = new Date(today.setHours(23, 59, 59, 999));

            switch (dateFilter) {
                case 'today':
                    dateFilterConditions.push({ createdAt: { $gte: startOfToday, $lte: endOfToday } });
                    break;
                case 'yesterday':
                    const startOfYesterday = new Date(startOfToday);
                    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
                    const endOfYesterday = new Date(startOfYesterday);
                    endOfYesterday.setHours(23, 59, 59, 999);
                    dateFilterConditions.push({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } });
                    break;
                case 'thisWeek':
                    const startOfWeek = new Date(startOfToday);
                    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                    dateFilterConditions.push({ createdAt: { $gte: startOfWeek, $lte: endOfToday } });
                    break;
                case 'thisMonth':
                    const startOfMonth = new Date(startOfToday);
                    startOfMonth.setDate(1);
                    dateFilterConditions.push({ createdAt: { $gte: startOfMonth, $lte: endOfToday } });
                    break;
                default:
                    break;
            }
        }

        if (fromDate) {
            dateFilterConditions.push({ createdAt: { $gte: new Date(fromDate) } });
        }

        if (toDate) {
            dateFilterConditions.push({ createdAt: { $lte: new Date(toDate) } });
        }

        if (dateFilterConditions.length) {
            filters.$and = dateFilterConditions;
        }
    }

    // Status filtering
    if (status) {
        filters.status = { $in: status.split(',') };
    }

    // User status filtering
    if (userStatus) {
        filters.userStatus = { $in: userStatus.split(',') };
    }
    // Blocked status filtering
    if (blocked) {
        filters.blocked = (blocked === 'true' || blocked === true);
    }

    // Country filtering
    if (country) {
        filters['userDetails.country'] = { $in: country.split(',') };
    }

    // Process filtering
    if (process) {
        filters.process = { $in: process.split(',') };
    }

    // Search query
    if (search) {
        filters.$or = [
            { name: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
            { 'userDetails.address': new RegExp(search, 'i') }
        ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(filters).skip(skip).limit(parseInt(limit)).exec();
    const totalUsers = await User.countDocuments(filters);

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: parseInt(page)
    };
};

const fetchUserById = async (userId) => {
    const user = await User.findById(userId)
        .populate('assignedBy', 'name email')
        .populate('orders', 'orderId planDetails.total orderDetails.purchase status')
        .populate('userDetails', 'profile_avatar country phone address')
        .exec();

    return user;
};

const saveVisitor = async (data) => {
    const { ipAddress, device } = data;
    const existingVisitor = await User.findOne({ ipAddress, userStatus: 'Visitor' });
    if (existingVisitor) {
        return null;
    }

    const visitor = new User({
        ipAddress,
        device,
        userStatus: 'Visitor',
        process: 'Pending',
        joined: new Date()
    });

    await visitor.save();
    return visitor;
};

const fetchVisitor = async (ipAddress) => {
    const visitor = await User.findOne({ ipAddress, userStatus: 'Visitor' })
        .exec();

    return visitor;
};

const updateVisitor = async (ip, data) => {
    const user = await User.findOne({ ipAddress: ip });
    if (!user) {
        return false;
    }

    if (data.email && data.email !== user.email) {
        const emailExists = await User.findOne({ email: data.email });
        if (emailExists) {
            throw new Error("Email already in use");
        }
        user.email = data.email;
    }

    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(data.password, salt);
    }

    if (data.name) user.name = data.name;
    if (data.assignedBy) user.assignedBy = data.assignedBy;
    if (data.avatar) user.userDetails.profile_avatar = data.avatar;
    if (data.userDetails) {
        if (data.userDetails.country) user.userDetails.country = data.userDetails.country;
        if (data.userDetails.phone) user.userDetails.phone = data.userDetails.phone;
        if (data.userDetails.address) user.userDetails.address = data.userDetails.address;
    }
    if (data.userStatus) user.userStatus = data.userStatus;
    if (data.remember_token) user.remember_token = data.remember_token;
    if (data.lastLoggedInAt) user.lastLoggedInAt = data.lastLoggedInAt;
    if (data.amountSpend) user.amountSpend = data.amountSpend;
    if (data.amountRefund) user.amountRefund = data.amountRefund;
    if (data.device) user.device = data.device;
    if (data.ipAddress) user.ipAddress = data.ipAddress;
    if (data.status) user.status = data.status;
    if (data.process) user.process = data.process;
    if (data.blocked !== undefined) user.blocked = data.blocked;
    if (data.walletAmount) user.walletAmount = data.walletAmount;
    if (data.targetedNumbers) user.targetedNumbers = data.targetedNumbers;

    await user.save();

    return user;
};

const registerUser = async (userData) => {
    const {
        name,
        email,
        password,
        assignedBy,
        userDetails,
        avatar,
        status,
        process,
        userStatus,
        amountRefund = 0,
        amountSpend = 0,
        ipAddress,
        device,
    } = userData;


    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email is already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let userByIp = await User.findOne({ ipAddress });
    if (userByIp) {
        userByIp.email = email;
        userByIp.password = hashedPassword;
        userByIp.name = name;
        userByIp.assignedBy = assignedBy;
        userByIp.userDetails = {
            profile_avatar: avatar,
            ...userDetails
        };
        userByIp.status = status || 'active';
        userByIp.userStatus = userStatus || 'Demo';
        userByIp.email_verified_at = new Date();
        userByIp.process = process;
        userByIp.joined = new Date();
        userByIp.amountSpend = amountSpend;
        userByIp.amountRefund = amountRefund;
        userByIp.device = device;
        await userByIp.save();
        return userByIp;
    }
    // Create a new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        assignedBy,
        userDetails: {
            profile_avatar: avatar,
            ...userDetails
        },
        status: status || 'active',
        userStatus: userStatus || 'Demo',
        email_verified_at: new Date(),
        process,
        joined: new Date(),
        amountSpend,
        amountRefund,
        ipAddress,
        device,
        // email_verified_at: new Date(),
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
};

const updateUser = async (id, data) => {
    const user = await User.findById(id);
    if (!user) {
        return false;
    }

    if (data.email && data.email !== user.email) {
        const emailExists = await User.findOne({ email: data.email });
        if (emailExists) {
            throw new Error("Email already in use");
        }
        user.email = data.email;
    }

    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(data.password, salt);
    }

    if (data.name) user.name = data.name;
    if (data.assignedBy) user.assignedBy = data.assignedBy;
    if (data.avatar) user.userDetails.profile_avatar = data.avatar;
    if (data.userDetails) {
        if (data.userDetails.country) user.userDetails.country = data.userDetails.country;
        if (data.userDetails.phone) user.userDetails.phone = data.userDetails.phone;
        if (data.userDetails.address) user.userDetails.address = data.userDetails.address;
    }
    if (data.userStatus) user.userStatus = data.userStatus;
    if (data.remember_token) user.remember_token = data.remember_token;
    if (data.lastLoggedInAt) user.lastLoggedInAt = data.lastLoggedInAt;
    if (data.amountSpend) user.amountSpend = data.amountSpend;
    if (data.amountRefund) user.amountRefund = data.amountRefund;
    if (data.device) user.device = data.device;
    if (data.ipAddress) user.ipAddress = data.ipAddress;
    if (data.status) user.status = data.status;
    if (data.process) user.process = data.process;
    if (data.blocked !== undefined) user.blocked = data.blocked;
    if (data.walletAmount) user.walletAmount = data.walletAmount;
    if (data.targetedNumbers) user.targetedNumbers = data.targetedNumbers;

    await user.save();

    return user;
};

const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
};

const addUserHistory = async (userId, action) => {
    const user = await User.findById(userId);
    if (!user) {
        return false;
    }

    user.history.push({
        date: new Date(),
        action
    });

    await user.save();
    return user;
}

const addUserHistoryByIP = async (ipAddress, action) => {
    const user = await User.findOne({ ipAddress: ipAddress });
    if (!user) {
        return false;
    }

    user.history.push({
        date: new Date(),
        action
    });

    await user.save();
    return user;
}
const getUserProfile = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return {
            statusCode: 200,
            message: 'Data Fetched successfully',
            data: user
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserProfile,
    getUserStatistics,
    fetchAllUsers,
    registerUser,
    updateUser,
    deleteUser,
    addUserHistory,
    fetchUserById,
    saveVisitor,
    fetchVisitor,
    addUserHistoryByIP,
    updateVisitor,
    getUserStatisticsByCountry
};
