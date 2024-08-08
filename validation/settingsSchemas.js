const yup = require('yup');

const timeUnitEnum = ['s', 'm', 'h', 'd'];

const parseJSON = (value, originalValue) => {
    if (typeof originalValue === 'string') {
        try {
            return JSON.parse(originalValue);
        } catch (err) {
            return originalValue;
        }
    }
    return value;
};

const timeSchema = yup.object().shape({
    quantity: yup.number().positive('Quantity must be positive'),
    unit: yup.string().oneOf(timeUnitEnum, 'Invalid time unit')
}).noUnknown(true, 'Unknown field in time data');

const youTubeVideoPopUpSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    title: yup.string().trim(),
    link: yup.string().trim()
}).transform(parseJSON).noUnknown(true, 'Unknown field in youtube video popup data');

const salesNotificationSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    timeGap: timeSchema.required('Time gap is required'),
    delayed: timeSchema.required('Delayed time is required'),
    name: yup.string().trim(),
    cityState: yup.string().trim(),
    planName: yup.string().trim(),
    purchaseTime: yup.string().trim()
}).transform(parseJSON).noUnknown(true, 'Unknown field in sales notification data');

const emailVerificationSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required')
}).transform(parseJSON).noUnknown(true, 'Unknown field in email verification data');

const offerPopUpSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    delayed: timeSchema.required('Delayed time is required'),
    image: yup.string().trim()
}).transform(parseJSON).noUnknown(true, 'Unknown field in offer popup data');

const createSettingsSchema = yup.object().shape({
    youTubeVideoPopUp: youTubeVideoPopUpSchema.required('YouTube Video PopUp settings are required'),
    salesNotification: salesNotificationSchema.required('Sales Notification settings are required'),
    emailVerification: emailVerificationSchema.required('Email Verification settings are required'),
    offerPopUp: offerPopUpSchema.required('Offer PopUp settings are required')
}).noUnknown(true, 'Unknown field in settings data');

module.exports = {
    createSettingsSchema
};
