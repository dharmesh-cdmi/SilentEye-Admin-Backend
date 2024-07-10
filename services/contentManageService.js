const ContentManage = require('../models/contentManageModel');

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

const fetchAllFeatures = async () => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.features || contentManage.features.length <= 0) {
        const error = new Error('Features not found!');
        error.code = 404;
        throw error;
    }
    return contentManage.features;
};

const fetchFeatures = async (pageIndex, limit) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.features || contentManage.features.length <= 0) {
        const error = new Error('Features not found!');
        error.code = 404;
        throw error;
    }
    const totalCount = contentManage.features.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (pageIndex - 1) * limit;
    const endIndex = pageIndex * limit;
    const features = contentManage.features.slice(startIndex, endIndex);
    if (!features || features.length <= 0) {
        const error = new Error('Features not found!');
        error.code = 404;
        throw error;
    }

    return {
        features,
        totalPages,
        totalCount
    };
};

const addFeature = async (featureData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    contentManage.features.push(featureData);
    await contentManage.save();
};

const updateFeature = async (featureId, updatedFeatureData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const featureIndex = contentManage.features.findIndex(feature => feature._id.toString() === featureId);
    if (featureIndex === -1) {
        const error = new Error('Feature not found!');
        error.code = 404;
        throw error;
    }
    contentManage.features[featureIndex] = { ...contentManage.features[featureIndex], ...updatedFeatureData };
    await contentManage.save();
};

const deleteFeature = async (featureId) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    contentManage.features = contentManage.features.filter(feature => feature._id.toString() !== featureId);
    await contentManage.save();
};

module.exports = {
    createContentManage,
    fetchContactDetails,
    updateContactDetails,
    fetchAllFeatures,
    fetchFeatures,
    addFeature,
    updateFeature,
    deleteFeature
};
