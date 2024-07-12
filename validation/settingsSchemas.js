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
});

const youTubeVideoPopUpSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    title: yup.string().trim(),
    link: yup.string().trim()
}).transform(parseJSON);

const salesNotificationSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    timeGap: timeSchema.required('Time gap is required'),
    delayed: timeSchema.required('Delayed time is required'),
    name: yup.string().trim(),
    cityState: yup.string().trim(),
    planName: yup.string().trim(),
    purchaseTime: yup.string().trim()
}).transform(parseJSON);

const emailVerificationSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required')
}).transform(parseJSON);

const offerPopUpSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    delayed: timeSchema.required('Delayed time is required'),
    image: yup.string().trim()
}).transform(parseJSON);

const createSettingsSchema = yup.object().shape({
    youTubeVideoPopUp: youTubeVideoPopUpSchema.required('YouTube Video PopUp settings are required'),
    salesNotification: salesNotificationSchema.required('Sales Notification settings are required'),
    emailVerification: emailVerificationSchema.required('Email Verification settings are required'),
    offerPopUp: offerPopUpSchema.required('Offer PopUp settings are required')
}).noUnknown(true, 'Unknown field in settings data');

module.exports = {
    createSettingsSchema
};
