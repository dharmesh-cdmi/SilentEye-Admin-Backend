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
        .select('name email username status')
        .sort({ createdAt: order === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('managerInfo', 'userLimit whatsapp skype assignedUsersCount');

    return {
        managers,
        page,
        limit,
        total,
    };
}

const createManager = async (data) => {
    let manager = new Admin({
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
    });

    manager.managerInfo = managerDetails._id;

    await manager.save();
    return await managerDetails.save();
}

const updateManager = async (id, data) => {
    const manager = await adminModel.findById(id);
    if (!manager) {
        return null;
    }

    const managerDetails = await ManagerInfo.findOne({ managerId: id });
    if (!managerDetails) {
        return null;
    }

    manager.name = data.name || manager.name;
    manager.email = data.email || manager.email;
    manager.username = data.username || manager.username;
    manager.status = data.status || manager.status;
    managerDetails.userLimit = data.userLimit || managerDetails.userLimit;
    managerDetails.whatsapp = data.whatsapp || managerDetails.whatsapp;
    managerDetails.skype = data.skype || managerDetails.skype;

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
