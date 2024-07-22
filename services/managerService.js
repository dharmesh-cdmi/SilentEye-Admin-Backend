const adminModel = require("../models/admin/adminModel");
const ManagerInfo = require("../models/managerInfoModel");

const fetchAllManagers = async (queryParams) => {
    let { page, limit, searchQuery, status, order } = queryParams;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    order = order || 'desc';

    const query = { role: 'manager' };

    if (searchQuery) {
        query.$or = [
            { name: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
            { username: { $regex: searchQuery, $options: 'i' } },
        ];
    }
    if (status) {
        query.status = status;
    }

    const total = await adminModel.countDocuments(query);

    const managers = await adminModel.find(query)
        .select('name email username status role')
        .sort({ createdAt: order === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('managerInfo', 'userLimit whatsapp skype assignedUsersCount order live');

    return {
        managers,
        page,
        limit,
        total,
    };
}

const createManager = async (data) => {
    const existingEmail = await adminModel.findOne({ email: data.email });
    const existingUsername = await adminModel.findOne({ username: data.username });

    if (existingEmail) throw new Error('Email already in use');
    if (existingUsername) throw new Error('Username already in use');

    let manager = new adminModel({
        name: data.name,
        email: data.email,
        username: data.username,
        email_verified_at: new Date(),
        password: data.password,
        role: 'manager',
        status: data.status || 'active',
    });

    const managerDetails = new ManagerInfo({
        managerId: manager._id,
        userLimit: data.userLimit,
        whatsapp: data.whatsapp,
        skype: data.skype,
        order: data.order,
        live: false,
    });

    manager.managerInfo = managerDetails._id;

    manager = await manager.save();
    return await managerDetails.save();
}


const updateManager = async (id, data) => {
    const manager = await adminModel.findById(id);
    if (!manager) {
        return null;
    }

    if (data.email && data.email !== manager.email) {
        const existingEmail = await adminModel.findOne({ email: data.email });
        if (existingEmail) throw new Error('Email already in use');
    }

    if (data.username && data.username !== manager.username) {
        const existingUsername = await adminModel.findOne({ username: data.username });
        if (existingUsername) throw new Error('Username already in use');
    }

    let managerDetails = await ManagerInfo.findOne({ managerId: id });

    if (data.name) manager.name = data.name;
    if (data.email) manager.email = data.email;
    if (data.username) manager.username = data.username;
    if (data.status) manager.status = data.status;
    if (data.userLimit) managerDetails.userLimit = data.userLimit;
    if (data.whatsapp) managerDetails.whatsapp = data.whatsapp;
    if (data.skype) managerDetails.skype = data.skype;
    if (data.order !== undefined) managerDetails.order = data.order;
    if (data.live !== undefined) managerDetails.live = data.live;

    await manager.save();
    return await managerDetails.save();
}

const deleteManager = async (id) => {
    const manager = await adminModel.findById(id);
    if (!manager) {
        return null;
    }

    await ManagerInfo.deleteOne({ managerId: id });
    return await adminModel.findByIdAndDelete(id);
}

module.exports = {
    fetchAllManagers,
    createManager,
    updateManager,
    deleteManager,
};
