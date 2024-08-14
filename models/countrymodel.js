// country model

const { Schema } = require("mongoose");
const { default: mongoose } = require("mongoose");

const countrySchema = new Schema({
    countryId: { type: String, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

const Country = mongoose.model('Country', countrySchema);

module.exports = { Country };