const ContentManage = require('../models/contentManageModel');

const fetchContactDetails = async () => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.contents?.contactDetails) {
        const error = new Error('Contact details not found!');
        error.code = 404;
        throw error;
    }
    return contentManage.contents.contactDetails;
};

const updateContactDetails = async (updatedContactDetails) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    contentManage.contents.contactDetails = updatedContactDetails;
    await contentManage.save();
};


















const createContentManage = async () => {
    const newContentManage = await ContentManage.create({
        contents: {
            contactDetails: {}
        },
        features: [],
        pages: [],
        faqs: [],
        reviews: []
    });
};

const test = async () => {
    try {
        await createContentManage();
        console.log('Content Manage created!');
    } catch (error) {
        console.log('Error: ', error);
    }
};

// test();

module.exports = {
    fetchContactDetails,
    updateContactDetails
};
