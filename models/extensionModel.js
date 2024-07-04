const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExtensionSchema = new Schema({
    Captcha: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        key: {
            type: String,
            required: true,
            trim: true
        },
        secretKey: {
            type: String,
            required: true,
            trim: true
        }
    },
    TwoFA: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        key: {
            type: String,
            required: true,
            trim: true
        },
        secretKey: {
            type: String,
            required: true,
            trim: true
        }
    },
    TagManager: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        id: {
            type: String,
            required: true,
            trim: true
        }
    },
    ChatBot: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        key: {
            type: String,
            required: true,
            trim: true
        },
        secretKey: {
            type: String,
            required: true,
            trim: true
        }
    }
}, {
    timestamps: true
});

const Extension = mongoose.model('Extension', ExtensionSchema);

module.exports = Extension;
