const yup = require('yup');

const timeUnitEnum = ['s', 'm', 'h', 'd'];

const timeSchema = yup.object().shape({
    quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
    unit: yup.string().oneOf(timeUnitEnum, 'Invalid time unit').required('Unit is required')
});

const youTubeVideoPopUpSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    title: yup.string().required('Title is required').trim(),
    link: yup.string().required('Link is required').trim().url('Invalid URL')
});

const salesNotificationSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    timeGap: timeSchema.required('Time gap is required'),
    delayed: timeSchema.required('Delayed time is required'),
    name: yup.string().required('Name is required').trim(),
    cityState: yup.string().required('City/State is required').trim(),
    planName: yup.string().required('Plan name is required').trim(),
    purchaseTime: yup.string().required('Purchase time is required').trim()
});

const emailVerificationSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required')
});

const offerPopUpSchema = yup.object().shape({
    status: yup.string().oneOf(['enabled', 'disabled'], 'Invalid status').required('Status is required'),
    delayed: timeSchema.required('Delayed time is required'),
    image: yup.string().required('Image URL is required').trim().url('Invalid URL')
});

const createSettingsSchema = yup.object().shape({
    youTubeVideoPopUp: youTubeVideoPopUpSchema.required('YouTube Video PopUp settings are required'),
    salesNotification: salesNotificationSchema.required('Sales Notification settings are required'),
    emailVerification: emailVerificationSchema.required('Email Verification settings are required'),
    offerPopUp: offerPopUpSchema.required('Offer PopUp settings are required')
}).noUnknown(true, 'Unknown field in settings data');

module.exports = {
    createSettingsSchema
};
