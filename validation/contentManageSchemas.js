const yup = require('yup');

const contactSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    value: yup.string().trim().default(''),
}).noUnknown(true, 'Unknown field in contact data');

const emailSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    value: yup.string().trim().default(''),
}).noUnknown(true, 'Unknown field in email data');

const addressSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    value: yup.string().trim().default(''),
}).noUnknown(true, 'Unknown field in address data');

const contactDetailsSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    contact: contactSchema.required('Contact data is required'),
    email: emailSchema.required('Email data is required'),
    address: addressSchema.required('Address data is required'),
}).noUnknown(true, 'Unknown field in contact details data');

const featureSchema = yup.object().shape({
    status: yup.string().required().oneOf(['enabled', 'disabled']),
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().required('Description is required'),
    icon: yup.string().trim().required('Icon is required'),
    stopHere: yup.boolean().required('Stop Here is required'),
    process: yup.string().trim().required('Process is required'),
    failCount: yup.number().positive('Fail Count must be positive').required('Fail Count is required'),
}).noUnknown(true, 'Unknown field in feature data');

module.exports = {
    contactDetailsSchema,
    featureSchema
};