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
    status: yup.string().required().oneOf(['enabled', 'disabled']),
    contact: contactSchema.required('Contact data is required'),
    email: emailSchema.required('Email data is required'),
    address: addressSchema.required('Address data is required'),
}).noUnknown(true, 'Unknown field in contact details data');

module.exports = {
    contactDetailsSchema,
};