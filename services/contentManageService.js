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
    const featureToUpdate = contentManage.features[featureIndex];
    for (const key in updatedFeatureData) {
        if (updatedFeatureData.hasOwnProperty(key) && featureToUpdate[key] !== undefined) {
            featureToUpdate[key] = updatedFeatureData[key];
        }
    }
    await contentManage.save();
};

const deleteFeature = async (featureId) => {
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
    contentManage.features.splice(featureIndex, 1);
    await contentManage.save();
};

const fetchAllPages = async () => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.pages || contentManage.pages.length <= 0) {
        const error = new Error('Pages not found!');
        error.code = 404;
        throw error;
    }
    return contentManage.pages;
};

const fetchPages = async (pageIndex, limit) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.pages || contentManage.pages.length <= 0) {
        const error = new Error('Pages not found!');
        error.code = 404;
        throw error;
    }
    const totalCount = contentManage.pages.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (pageIndex - 1) * limit;
    const endIndex = pageIndex * limit;
    const pages = contentManage.pages.slice(startIndex, endIndex);
    if (!pages || pages.length <= 0) {
        const error = new Error('Pages not found!');
        error.code = 404;
        throw error;
    }

    return {
        pages,
        totalPages,
        totalCount
    };
};

const addPage = async (pageData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    contentManage.pages.push(pageData);
    await contentManage.save();
};

const updatePage = async (pageId, updatedPageData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const pageIndex = contentManage.pages.findIndex(page => page._id.toString() === pageId);
    if (pageIndex === -1) {
        const error = new Error('Page not found!');
        error.code = 404;
        throw error;
    }
    const pageToUpdate = contentManage.pages[pageIndex];
    for (const key in updatedPageData) {
        if (updatedPageData.hasOwnProperty(key) && pageToUpdate[key] !== undefined) {
            pageToUpdate[key] = updatedPageData[key];
        }
    }
    await contentManage.save();
};

const deletePage = async (pageId) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const pageIndex = contentManage.pages.findIndex(page => page._id.toString() === pageId);
    if (pageIndex === -1) {
        const error = new Error('Page not found!');
        error.code = 404;
        throw error;
    }
    contentManage.pages.splice(pageIndex, 1);
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
    deleteFeature,
    fetchAllPages,
    fetchPages,
    addPage,
    updatePage,
    deletePage
};
