const yup = require('yup');

const createContactSchema = yup.object().shape({
    subject: yup.string().trim().required('Subject is required'),
    message: yup.string().trim().required('Message is required'),
    name: yup.string().trim().required('Name is required'),
    email: yup.string().email('Invalid email address').trim().required('Email is required'),
    contact: yup.string().trim().required('Contact is required'),
}).noUnknown(true, 'Unknown field in contact form data');

const searchContactSchema = yup.object().shape({
    pageIndex: yup.number().required('Page index is required'),
    limit: yup.number().required('Limit is required'),
    searchQuery: yup.string().trim(),
}).noUnknown(true, 'Unknown field in search contact form data');


module.exports = {
    createContactSchema,
    searchContactSchema
};
