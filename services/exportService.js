const fs = require('fs');
const ExcelJS = require('exceljs');

const generateHomePageAnalyticsExcel = async (data, filePath) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid data. Must be a non-empty object.');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');

    const addDataToSheet = (headers, data, startRow) => {
        sheet.addRow(headers);
        data.forEach(item => {
            const row = headers.map(header => item[header] !== undefined ? item[header].toString() : '');
            sheet.addRow(row);
        });
        return startRow + data.length + 1;
    };

    let startRow = 1;

    // Process visitorDetails
    if (data.visitorDetails && data.visitorDetails.visitorDetails.length) {
        const headers = ['page', 'action', 'totalCount'];
        startRow = addDataToSheet(headers, data.visitorDetails.visitorDetails, startRow);
    }

    // Process orders
    if (data.orders) {
        const ordersData = data.orders;
        const headers = ['Category', 'count', 'amount'];

        const ordersArray = Object.entries(ordersData).map(([key, value]) => ({
            Category: key,
            count: value.count !== undefined ? value.count.toString() : '',
            amount: value.amount !== undefined ? value.amount.toString() : ''
        })).filter(item => item.Category !== 'refundData');

        startRow = addDataToSheet(headers, ordersArray, startRow);

        // Process refundData
        if (ordersData.refundData) {
            const refundHeaders = ['Refund Category', 'count', 'amount'];
            const refundArray = Object.entries(ordersData.refundData).map(([key, value]) => ({
                'Refund Category': key,
                count: value.count !== undefined ? value.count.toString() : '',
                amount: value.amount !== undefined ? value.amount.toString() : ''
            }));
            startRow = addDataToSheet(refundHeaders, refundArray, startRow);
        }
    }

    // Process totalLoggedInUser, totalSupportTicket, totalContactFormSubmited
    const otherData = [
        { Category: 'Total Logged In Users', Count: data.totalLoggedInUser !== undefined ? data.totalLoggedInUser.toString() : '', Amount: '' },
        { Category: 'Total Support Tickets', Count: data.totalSupportTicket !== undefined ? data.totalSupportTicket.toString() : '', Amount: '' },
        { Category: 'Total Contact Form Submissions', Count: data.totalContactFormSubmited !== undefined ? data.totalContactFormSubmited.toString() : '', Amount: '' }
    ];

    const otherHeaders = ['Category', 'Count', 'Amount'];
    addDataToSheet(otherHeaders, otherData, startRow);

    await workbook.xlsx.writeFile(filePath);
};


const exportOrdersToExcel = async (orders) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    // Add header row
    worksheet.columns = [
        { header: 'Order ID', key: 'orderId', width: 20 },
        { header: 'Email Id', key: 'email', width: 20 },
        { header: 'Country', key: 'country', width: 20 },
        { header: 'Checkout', key: 'purchaseDate', width: 20 },
        { header: 'Plan', key: 'planName', width: 20 },
        { header: 'Amount', key: 'amount', width: 10 },
        { header: 'Method', key: 'paymentMethod', width: 10 }
    ];

    // Add data rows
    orders.forEach(order => {
        worksheet.addRow({
            orderId: order._id,
            userId: order.userId,
            planName: order.planDetails.planName,
            amount: order.planDetails.amount,
            purchaseDate: order.orderDetails.purchase,
            country: order.orderDetails.country,
            status: order.status
        });
    });

    // Create buffer and return
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};



const exportData = async (format, data) => {
    const filePath = `./downloads/export.${format}`;
    if (format === 'xlsx') {
        await generateHomePageAnalyticsExcel(data, filePath);
    } else {
        throw new Error('Invalid format. Must be "xlsx".');
    }
    return filePath;
};

const generateUsersDataExcel = async (data, filePath) => {
    if (!data || !Array.isArray(data) || !data.length) {
        throw new Error('Invalid data. Must be a non-empty array.');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Add header row
    worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 20 },
        { header: 'Country', key: 'country', width: 20 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Address', key: 'address', width: 20 },
        { header: 'Status', key: 'status', width: 10 },
        { header: 'Amount Spend', key: 'amountSpend', width: 10 },
        { header: 'Amount Refund', key: 'amountRefund', width: 10 },
        { header: 'Device', key: 'device', width: 10 },
        { header: 'IP Address', key: 'ipAddress', width: 20 },
        { header: 'Blocked', key: 'blocked', width: 10 },
        { header: 'User Status', key: 'userStatus', width: 10 },
        { header: 'Process', key: 'process', width: 10 },
        { header: 'Joined', key: 'joined', width: 20 },
        { header: 'Wallet Amount', key: 'walletAmount', width: 10 }
    ];

    // Add data rows
    data.forEach(user => {
        worksheet.addRow({
            name: user.name,
            email: user.email,
            country: user.userDetails?.country,
            phone: user.userDetails?.phone,
            address: user.userDetails?.address,
            status: user.status,
            amountSpend: user.amountSpend,
            amountRefund: user.amountRefund,
            device: user.device,
            ipAddress: user.ipAddress,
            blocked: user.blocked,
            userStatus: user.userStatus,
            process: user.process,
            joined: user.joined,
            walletAmount: user.walletAmount
        });
    });

    try {
        // if file already exists, remove it and if not, create it recursively
        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath);

        if (!fs.existsSync(filePath)) {
            let path = filePath.split('/');
            path.pop();
            fs.mkdirSync(path.join('/'), { recursive: true });
        }

        await workbook.xlsx.writeFile(filePath);
    }
    catch (error) {
        console.log('Error generating excel file:', error);
        throw new Error('Error generating excel file');
    }
}

const exportUsersData = async (format, data) => {
    const filePath = __dirname + '/downloads/users.' + format;
    if (format === 'xlsx') {
        await generateUsersDataExcel(data, filePath);
    } else {
        throw new Error('Invalid format. Must be "xlsx".');
    }
    return filePath;
}

module.exports = {
    exportData,
    exportOrdersToExcel,
    exportUsersData
};
