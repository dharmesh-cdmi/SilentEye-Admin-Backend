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
            default: '',
            trim: true
        },
        link: {
            type: String,
            default: '',
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
                default: 0,
            },
            unit: {
                type: String,
                default: 's',
                enum: ['s', 'm', 'h', 'd'] // seconds, minutes, hours, days
            }
        },
        delayed: {
            quantity: {
                type: Number,
                default: 0,
            },
            unit: {
                type: String,
                default: 's',
                enum: ['s', 'm', 'h', 'd']
            }
        },
        name: {
            type: String,
            default: '',
            trim: true
        },
        cityState: {
            type: String,
            default: '',
            trim: true
        },
        planName: {
            type: String,
            default: '',
            trim: true
        },
        purchaseTime: {
            type: String,
            default: '',
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
                default: 0,
            },
            unit: {
                type: String,
                default: 's',
                enum: ['s', 'm', 'h', 'd']
            }
        },
        image: {
            type: String,
            default: null,
            trim: true
        }
    }
}, {
    timestamps: true
});

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
