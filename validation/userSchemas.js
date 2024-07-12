const yup = require('yup');

const resetPasswordSchema = yup.object().shape({
    oldPassword: yup.string().trim().required('Old password is required'),
    newPassword: yup.string().trim().required('New password is required'),
}).noUnknown(true, 'Unknown field in reset password data');


module.exports = {
    resetPasswordSchema,
};
