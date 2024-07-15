const User = require('../models/userModel');
const bcrypt = require('bcrypt');
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


const fetchAllUsers = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    fromDate,
    toDate,
    dateFilter,
    status,
    blocked,
    country,
    process,
    search
  } = queryParams;

  const filters = {};

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

  // Blocked status filtering
  if (blocked) {
    filters.blocked = blocked === 'true';
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

const registerUser = async (userData) => {
  const {
    name,
    email,
    password,
    assignedBy,
    profile_avatar,
    country,
    phone,
    address,
    status,
    process,
    amountRefund = 0,
    amountSpend = 0
  } = userData;


  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    assignedBy,
    userDetails: {
      profile_avatar,
      country,
      phone,
      address,
    },
    status,
    process,
    joined: new Date(),
    amountSpend,
    amountRefund,
    // email_verified_at: new Date(),
  });

  // Save the user to the database
  await newUser.save();

  return newUser;
};

const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
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
  if (data.userDetails) {
    if (data.userDetails.profile_avatar) user.userDetails.profile_avatar = data.userDetails.profile_avatar;
    if (data.userDetails.country) user.userDetails.country = data.userDetails.country;
    if (data.userDetails.phone) user.userDetails.phone = data.userDetails.phone;
    if (data.userDetails.address) user.userDetails.address = data.userDetails.address;
  }
  if (data.status) user.status = data.status;
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

module.exports = {
  getUserProfile,
  getUserStatistics,
  fetchAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  addUserHistory,
  fetchUserById
};
