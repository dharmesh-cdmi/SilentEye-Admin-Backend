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

//Faqs api's
const fetchAllFaqCategories = async () => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.faqCategories || contentManage.faqCategories.length <= 0) {
        const error = new Error('Faq Categories not found!');
        error.code = 404;
        throw error;
    }

    const faqCategoriesWithoutFaqs = contentManage.faqCategories.map(category => {
        const { faqs, ...categoryWithoutFaqs } = category.toObject();
        return categoryWithoutFaqs;
    });

    return faqCategoriesWithoutFaqs;
};

const addFaqCategory = async (categoryData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    contentManage.faqCategories.push(categoryData);
    await contentManage.save();
};

const updateFaqCategory = async (categoryId, updatedCategoryData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const categoryIndex = contentManage.faqCategories.findIndex(category => category._id.toString() === categoryId);
    if (categoryIndex === -1) {
        const error = new Error('Faq Category not found!');
        error.code = 404;
        throw error;
    }
    const categoryToUpdate = contentManage.faqCategories[categoryIndex];
    for (const key in updatedCategoryData) {
        if (updatedCategoryData.hasOwnProperty(key) && categoryToUpdate[key] !== undefined) {
            categoryToUpdate[key] = updatedCategoryData[key];
        }
    }
    await contentManage.save();
};

const deleteFaqCategory = async (categoryId) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const categoryIndex = contentManage.faqCategories.findIndex(category => category._id.toString() === categoryId);
    if (categoryIndex === -1) {
        const error = new Error('Faq Category not found!');
        error.code = 404;
        throw error;
    }
    contentManage.faqCategories.splice(categoryIndex, 1);
    await contentManage.save();
};

const fetchAllFaqsByCategory = async (categoryId) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.faqCategories || contentManage.faqCategories.length <= 0) {
        const error = new Error('Faq Categories not found!');
        error.code = 404;
        throw error;
    }
    const category = contentManage.faqCategories.find(category => category._id.toString() === categoryId);
    if (!category) {
        const error = new Error(`Faq Category with ID ${categoryId} not found!`);
        error.code = 404;
        throw error;
    }
    if (!category.faqs || category.faqs.length <= 0) {
        const error = new Error('Faqs not found!');
        error.code = 404;
        throw error;
    }
    return category.faqs;
};

const addFaqByCategory = async (categoryId, faqData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.faqCategories || contentManage.faqCategories.length <= 0) {
        const error = new Error('Faq Categories not found!');
        error.code = 404;
        throw error;
    }
    const category = contentManage.faqCategories.find(category => category._id.toString() === categoryId);
    if (!category) {
        const error = new Error(`Faq Category with ID ${categoryId} not found!`);
        error.code = 404;
        throw error;
    }
    category.faqs.push(faqData);
    await contentManage.save();
};

const updateFaqByCategory = async (categoryId, faqId, updatedFaqData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.faqCategories || contentManage.faqCategories.length <= 0) {
        const error = new Error('Faq Categories not found!');
        error.code = 404;
        throw error;
    }
    const category = contentManage.faqCategories.find(category => category._id.toString() === categoryId);
    if (!category) {
        const error = new Error(`Faq Category with ID ${categoryId} not found!`);
        error.code = 404;
        throw error;
    }
    const faqToUpdate = category.faqs.find(faq => faq._id.toString() === faqId);
    if (!faqToUpdate) {
        const error = new Error(`FAQ with ID ${faqId} not found in Faq Category with ID ${categoryId}!`);
        error.code = 404;
        throw error;
    }
    Object.assign(faqToUpdate, updatedFaqData);
    await contentManage.save();
};

const deleteFaqByCategory = async (categoryId, faqId) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.faqCategories || contentManage.faqCategories.length <= 0) {
        const error = new Error('Faq Categories not found!');
        error.code = 404;
        throw error;
    }
    const category = contentManage.faqCategories.find(category => category._id.toString() === categoryId);
    if (!category) {
        const error = new Error(`Faq Category with ID ${categoryId} not found!`);
        error.code = 404;
        throw error;
    }
    const faqIndex = category.faqs.findIndex(faq => faq._id.toString() === faqId);
    if (faqIndex === -1) {
        const error = new Error(`FAQ with ID ${faqId} not found in Faq Category with ID ${categoryId}!`);
        error.code = 404;
        throw error;
    }
    category.faqs.splice(faqIndex, 1);
    await contentManage.save();
};

//

const fetchAllReviews = async () => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.reviews || contentManage.reviews.length <= 0) {
        const error = new Error('Reviews not found!');
        error.code = 404;
        throw error;
    }
    return contentManage.reviews;
};

const fetchReviews = async (pageIndex, limit) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    if (!contentManage.reviews || contentManage.reviews.length <= 0) {
        const error = new Error('Reviews not found!');
        error.code = 404;
        throw error;
    }
    const totalCount = contentManage.reviews.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (pageIndex - 1) * limit;
    const endIndex = pageIndex * limit;
    const reviews = contentManage.reviews.slice(startIndex, endIndex);
    if (!reviews || reviews.length <= 0) {
        const error = new Error('Reviews not found!');
        error.code = 404;
        throw error;
    }

    return {
        reviews,
        totalPages,
        totalCount
    };
};

const addReview = async (reviewData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    contentManage.reviews.push(reviewData);
    await contentManage.save();
};

const updateReview = async (reviewId, updatedReviewData) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const reviewIndex = contentManage.reviews.findIndex(review => review._id.toString() === reviewId);
    if (reviewIndex === -1) {
        const error = new Error('Review not found!');
        error.code = 404;
        throw error;
    }
    const reviewToUpdate = contentManage.reviews[reviewIndex];
    for (const key in updatedReviewData) {
        if (updatedReviewData.hasOwnProperty(key) && reviewToUpdate[key] !== undefined) {
            reviewToUpdate[key] = updatedReviewData[key];
        }
    }
    await contentManage.save();
};

const deleteReview = async (reviewId) => {
    const contentManage = await ContentManage.findOne({});
    if (!contentManage) {
        const error = new Error('Content manage not found!');
        error.code = 404;
        throw error;
    }
    const reviewIndex = contentManage.reviews.findIndex(review => review._id.toString() === reviewId);
    if (reviewIndex === -1) {
        const error = new Error('Review not found!');
        error.code = 404;
        throw error;
    }
    contentManage.reviews.splice(reviewIndex, 1);
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
    deletePage,
    fetchAllFaqCategories,
    addFaqCategory,
    updateFaqCategory,
    deleteFaqCategory,
    fetchAllFaqsByCategory,
    addFaqByCategory,
    updateFaqByCategory,
    deleteFaqByCategory,
    fetchAllReviews,
    fetchReviews,
    addReview,
    updateReview,
    deleteReview,
};
