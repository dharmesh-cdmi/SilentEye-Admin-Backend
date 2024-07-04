const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);

module.exports = ContactForm;
