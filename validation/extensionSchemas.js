const yup = require('yup');

const captchaSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    key: yup.string().trim(),
    secretKey: yup.string().trim()
}).noUnknown(true, 'Unknown field in captcha data');

const twoFASchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    key: yup.string().trim(),
    secretKey: yup.string().trim()
}).noUnknown(true, 'Unknown field in two fa data');

const tagManagerSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    id: yup.string().trim()
}).noUnknown(true, 'Unknown field in tag manager data');

const chatBotSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    key: yup.string().trim(),
    secretKey: yup.string().trim()
}).noUnknown(true, 'Unknown field in chat bot data');

const createAndUpdateExtenionsSchema = yup.object().shape({
    captcha: captchaSchema.required('Captcha data is required'),
    twoFA: twoFASchema.required('Two FA data is required'),
    tagManager: tagManagerSchema.required('Tag Manager data is required'),
    chatBot: chatBotSchema.required('Chat Bot data is required')
}).noUnknown(true, 'Unknown field in extensions data');

module.exports = {
    createAndUpdateExtenionsSchema
};