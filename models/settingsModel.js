const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    youTubeVideoPopUp: {
        status: {
            type: String,
            required: true,
            enum: ['enabled', 'disabled']
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        link: {
            type: String,
            required: true,
            trim: true
        }
    },
    salesNotification: {
        status: {
            type: String,
            required: true,
            enum: ['enabled', 'disabled']
        },
        timeGap: {
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['s', 'm', 'h', 'd'] // seconds, minutes, hours, days
            }
        },
        delayed: {
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['s', 'm', 'h', 'd']
            }
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        cityState: {
            type: String,
            required: true,
            trim: true
        },
        planName: {
            type: String,
            required: true,
            trim: true
        },
        purchaseTime: {
            type: String,
            required: true,
            trim: true
        }
    },
    emailVerification: {
        status: {
            type: String,
            required: true,
            enum: ['enabled', 'disabled']
        }
    },
    offerPopUp: {
        status: {
            type: String,
            required: true,
            enum: ['enabled', 'disabled']
        },
        delayed: {
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['s', 'm', 'h', 'd']
            }
        },
        image: {
            type: String,
            required: true,
            trim: true
        }
    }
}, {
    timestamps: true
});

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
