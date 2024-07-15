const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExtensionSchema = new Schema({
    captcha: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        key: {
            type: String,
            default: '',
            trim: true
        },
        secretKey: {
            type: String,
            default: '',
            trim: true
        }
    },
    twoFA: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        key: {
            type: String,
            default: '',
            trim: true
        },
        secretKey: {
            type: String,
            default: '',
            trim: true
        }
    },
    tagManager: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        id: {
            type: String,
            default: '',
            trim: true
        }
    },
    chatBot: {
        status: {
            type: String,
            enum: ['enabled', 'disabled'],
            required: true,
            trim: true
        },
        key: {
            type: String,
            default: '',
            trim: true
        },
        secretKey: {
            type: String,
            default: '',
            trim: true
        }
    }
}, {
    timestamps: true
});

const Extension = mongoose.model('Extension', ExtensionSchema);

module.exports = Extension;
