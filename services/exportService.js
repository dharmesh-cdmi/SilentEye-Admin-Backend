const fs = require('fs');
const ExcelJS = require('exceljs');

const generateExcel = async (data, filePath) => {
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

const exportData = async (format, data) => {
    const filePath = `./downloads/export.${format}`;
    if (format === 'xlsx') {
        await generateExcel(data, filePath);
    } else {
        throw new Error('Invalid format. Must be "xlsx".');
    }
    return filePath;
};

module.exports = {
    exportData,
};
