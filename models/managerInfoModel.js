const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const ManagerInfoSchema = new Schema({
    managerId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    userLimit: { type: Number, default: 0 },
    whatsapp: { type: String },
    skype: { type: String },
    assignedUsersCount: { type: Number, default: 0 },
});

const ManagerInfo = mongoose.model('ManagerInfo', ManagerInfoSchema);

module.exports = ManagerInfo;