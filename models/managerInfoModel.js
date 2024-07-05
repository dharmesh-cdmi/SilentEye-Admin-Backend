const { Schema } = require("mongoose");

const ManagerInfoSchema = new Schema({
    // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, TODO: Add userId
    userLimit: { type: Number, default: 0 },
    whatsapp: { type: String },
    skype: { type: String },
    assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const ManagerInfo = mongoose.model('ManagerInfo', ManagerInfoSchema);

module.exports = ManagerInfo;