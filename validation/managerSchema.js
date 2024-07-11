const yup = require('yup');

const createManagerSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup.string().trim().required('Username is required'),
    password: yup.string().trim().required('Password is required'),
    userLimit: yup.number().required('User limit is required'),
    whatsapp: yup.string().trim().required('Whatsapp is required'),
    skype: yup.string().trim().required('Skype is required'),
    status: yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Status is required')
}).noUnknown(true, 'Unknown field in manager data');

const updateManagerSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    userLimit: yup.number().required('User limit is required'),
    whatsapp: yup.string().trim().required('Whatsapp is required'),
    skype: yup.string().trim().required('Skype is required'),
    status: yup.string().oneOf(['active', 'inactive'], 'Invalid status').required('Status is required')
}).noUnknown(true, 'Unknown field in manager data');

const searchManagerSchema = yup.object().shape({
    pageIndex: yup.number(),
    limit: yup.number(),
    searchQuery: yup.string().trim(),
    order: yup.string().oneOf(['asc', 'desc'], 'Invalid order')
}).noUnknown(true, 'Unknown field in search manager form data');

module.exports = {
    createManagerSchema,
    updateManagerSchema,
    searchManagerSchema
};
