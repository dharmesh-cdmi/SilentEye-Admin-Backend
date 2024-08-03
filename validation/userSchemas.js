const yup = require('yup');

const resetPasswordSchema = yup.object().shape({
    oldPassword: yup.string().trim().required('Old password is required'),
    newPassword: yup.string().trim().required('New password is required'),
}).noUnknown(true, 'Unknown field in reset password data');


const createUserSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().trim().required('Password is required'),
    assignedBy: yup.string().trim().matches(/^[0-9a-fA-F]{24}$/, 'Invalid Admin ID'),
    userDetails: yup.object().shape({
        profile_avatar: yup.string(),
        country: yup.string().trim(),
        phone: yup.string(),
        address: yup.string().trim(),
    }),
    status: yup.string().oneOf(['active', 'inactive'], 'Invalid status').default('active'),
    amountSpend: yup.number().min(0).default(0),
    amountRefund: yup.number().min(0).default(0),
    device: yup.string().trim(),
    ipAddress: yup.string().trim().matches(/^(\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address').required('IP Address is required'),
    blocked: yup.boolean(),
    userStatus: yup.string().oneOf(['Demo', 'Checkout', 'Paid', 'Visitor'], 'Invalid status').default('Demo'),
    process: yup.string().oneOf(['Running', 'Pending', 'Completed'], 'Invalid process').default('Pending'),
    joined: yup.date().default(() => new Date()),
    history: yup.array().of(
        yup.object().shape({
            date: yup.date().default(() => new Date()),
            action: yup.string().required('Action is required'),
        })
    ),
    orders: yup.array().of(
        yup.string().trim().matches(/^[0-9a-fA-F]{24}$/, 'Invalid Order ID')
    ).optional(),
    // plan will be object with unknown keys
    plan: yup.object().noUnknown(true).required('Plan is required'),
    addOns: yup.array().of(
        yup.object().noUnknown(true)
    ).optional(),
    targetedNumbers: yup.array().of(yup.string().trim()),
    walletAmount: yup.number().min(0).default(0),
});

const updateUserSchema = yup.object().shape({
    name: yup.string().trim(),
    email: yup.string().email('Invalid email'),
    password: yup.string().trim(),
    assignedBy: yup.string().trim().matches(/^[0-9a-fA-F]{24}$/, 'Invalid Admin ID'),
    userDetails: yup.object().shape({
        profile_avatar: yup.string(),
        country: yup.string().trim(),
        phone: yup.string(),
        address: yup.string().trim(),
    }),
    status: yup.string().oneOf(['active', 'inactive'], 'Invalid status'),
    amountSpend: yup.number().min(0),
    amountRefund: yup.number().min(0),
    device: yup.string().trim(),
    ipAddress: yup.string().trim(),
    blocked: yup.boolean(),
    status: yup.string().oneOf(['Demo', 'Checkout', 'Paid', 'Visitor', 'Payment_Initiated', 'Purchased', 'Logged_In', 'Refund_Requested', 'Blocked'], 'Invalid status'),
    process: yup.string().oneOf(['Running', 'Pending', 'Completed'], 'Invalid process'),
    history: yup.array().of(
        yup.object().shape({
            date: yup.date().default(() => new Date()),
            action: yup.string(),
        })
    ),
    orders: yup.array().of(
        yup.string().trim().matches(/^[0-9a-fA-F]{24}$/, 'Invalid Order ID')
    ),
    targetedNumbers: yup.array().of(yup.string().trim()),
    walletAmount: yup.number(),
});

const addUserHistorySchema = yup.object().shape({
    action: yup.string().required('Action is required'),
});

const saveVisitorSchema = yup.object().shape({
    ipAddress: yup.string().trim().matches(/^(\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address').required('IP Address is required'),
    device: yup.string().trim(),
});

const downloadQuerySchema = yup.object().shape({
    format: yup.string().trim().oneOf(['xlsx', 'pdf'], 'Invalid format').required('Format is required').default('xlsx'),
});

module.exports = {
    resetPasswordSchema,
    createUserSchema,
    updateUserSchema,
    addUserHistorySchema,
    saveVisitorSchema,
    downloadQuerySchema,
};
