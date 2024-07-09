const ContentManage = require('../models/contentManageModel');

const fetchContactDetails = async () => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    return contentManage.contents.contactDetails;
};

module.exports = {
    fetchContactDetails,
};
