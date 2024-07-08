const adminModel = require("../models/admin/adminModel");
const ManagerInfo = require("../models/managerInfoModel");

const fetchAllMangers = async (queryParams) => {
    let { page, limit, searchQuery, status, order } = queryParams;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const query = {};
    if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' };
        query.email = { $regex: searchQuery, $options: 'i' };
    }
    if (status) {
        query.status = status;
    }
    const total = await adminModel.countDocuments(query);

    let managers = await adminModel.find({ role: 'manager' })
        .select('name email')
        .sort({ createdAt: order })
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
    let manager = new adminModel({
        name: data.name,
        email: data.email,
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

    manager = await manager.save();
    return await managerDetails.save();
}


const updateManager = async (id, data) => {
    const manager = await adminModel.findById(id);
    if (!manager) {
        return null;
    }

    let managerDetails = await ManagerInfo.findOne({ managerId: id });
    manager.name = data.name;
    manager.email = data.email;
    manager.status = data.status;
    managerDetails.userLimit = data.userLimit;
    managerDetails.whatsapp = data.whatsapp;
    managerDetails.skype = data.skype;

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
    fetchAllMangers,
    createManager,
    updateManager,
    deleteManager,
};
