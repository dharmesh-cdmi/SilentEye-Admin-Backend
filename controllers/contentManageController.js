const contentManageService = require('../services/contentManageService');

const CreateContentManage = async (req, res, next) => {
    try {
        await contentManageService.createContentManage();
        res.status(200).send('Content Manage created successfully!');
    } catch (error) {
        next(error);
    }
};

const FetchContactDetails = async (req, res, next) => {
    try {
        const contactDetails = await contentManageService.fetchContactDetails();
        res.status(200).json({ contactDetails });
    } catch (error) {
        next(error);
    }
};

const UpdateContactDetails = async (req, res, next) => {
    try {
        const data = req.body;
        await contentManageService.updateContactDetails(data);
        res.status(200).send('Contact details updated successfully!');
    } catch (error) {
        next(error);
    }
};

const FetchAllFeatures = async (req, res, next) => {
    try {
        const features = await contentManageService.fetchAllFeatures();
        res.status(200).json({ features });
    } catch (error) {
        next(error);
    }
};

const FetchFeatures = async (req, res, next) => {
    try {
        const { pageIndex, limit } = req.query;
        const parsedPageIndex = parseInt(pageIndex, 10);
        const parsedLimit = parseInt(limit, 10);
        const result = await contentManageService.fetchFeatures(parsedPageIndex, parsedLimit);
        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

const AddFeature = async (req, res, next) => {
    try {
        const icon = req.file;
        let iconPath = (icon && icon.path) || null;
        const data = {
            ...req.body,
            stopHere: req.body.stopHere === "true",
            failCount: Number(req.body.failCount),
            icon: iconPath
        };
        await contentManageService.addFeature(data);
        res.status(200).send('Feature added successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateFeature = async (req, res, next) => {
    try {
        const { featureId } = req.params;
        const data = {
            ...req.body,
            stopHere: req.body.stopHere === "true",
            failCount: Number(req.body.failCount),
        };
        if (req.file && req.file.mimetype.startsWith('image/')) {
            data.icon = req.file.path;
        }
        else {
            delete data.icon;
        }
        await contentManageService.updateFeature(featureId, data);
        res.status(200).send('Feature updated successfully!');
    } catch (error) {
        next(error);
    }
};

const DeleteFeature = async (req, res, next) => {
    try {
        const { featureId } = req.params;
        await contentManageService.deleteFeature(featureId);
        res.status(200).send('Feature deleted successfully!');
    } catch (error) {
        next(error);
    }
};

const FetchAllPages = async (req, res, next) => {
    try {
        const pages = await contentManageService.fetchAllPages();
        res.status(200).json({ pages });
    } catch (error) {
        next(error);
    }
};

const FetchPages = async (req, res, next) => {
    try {
        const { pageIndex, limit } = req.query;
        const parsedPageIndex = parseInt(pageIndex, 10);
        const parsedLimit = parseInt(limit, 10);
        const result = await contentManageService.fetchPages(parsedPageIndex, parsedLimit);
        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

const AddPage = async (req, res, next) => {
    try {
        const data = req.body;
        await contentManageService.addPage(data);
        res.status(200).send('Page added successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdatePage = async (req, res, next) => {
    try {
        const { pageId } = req.params;
        const data = req.body;
        await contentManageService.updatePage(pageId, data);
        res.status(200).send('Page updated successfully!');
    } catch (error) {
        next(error);
    }
};

const DeletePage = async (req, res, next) => {
    try {
        const { pageId } = req.params;
        await contentManageService.deletePage(pageId);
        res.status(200).send('Page deleted successfully!');
    } catch (error) {
        next(error);
    }
};

//Faqs api's
const FetchAllFaqCategories = async (req, res, next) => {
    try {
        const categories = await contentManageService.fetchAllFaqCategories();
        res.status(200).json({ categories });
    } catch (error) {
        next(error);
    }
};

const AddFaqCategory = async (req, res, next) => {
    try {
        const image = req.file;
        let imagePath = (image && image.path) || null;
        const data = {
            ...req.body,
            faqs: [],
            image: imagePath
        };
        await contentManageService.addFaqCategory(data);
        res.status(200).send('Faq Category added successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateFaqCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const data = { ...req.body };
        if (req.file && req.file.mimetype.startsWith('image/')) {
            data.image = req.file.path;
        }
        else {
            delete data.image;
        }
        await contentManageService.updateFaqCategory(categoryId, data);
        res.status(200).send('Faq Category updated successfully!');
    } catch (error) {
        next(error);
    }
};

const DeleteFaqCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        await contentManageService.deleteFaqCategory(categoryId);
        res.status(200).send('Faq Category deleted successfully!');
    } catch (error) {
        next(error);
    }
};

const FetchAllFaqsByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const faqs = await contentManageService.fetchAllFaqsByCategory(categoryId);
        res.status(200).json({ faqs });
    } catch (error) {
        next(error);
    }
};

const AddFaqByCategory = async (req, res, next) => {
    try {
        const data = { ...req.body };
        const { categoryId } = req.params;
        await contentManageService.addFaqByCategory(categoryId, data);
        res.status(200).send('Faq added successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateFaqByCategory = async (req, res, next) => {
    try {
        const { categoryId, faqId } = req.params;
        const data = { ...req.body };
        await contentManageService.updateFaqByCategory(categoryId, faqId, data);
        res.status(200).send('Faq updated successfully!');
    } catch (error) {
        next(error);
    }
};

const DeleteFaqByCategory = async (req, res, next) => {
    try {
        const { categoryId, faqId } = req.params;
        await contentManageService.deleteFaqByCategory(categoryId, faqId);
        res.status(200).send('Faq deleted successfully!');
    } catch (error) {
        next(error);
    }
};

//

const FetchAllReviews = async (req, res, next) => {
    try {
        const reviews = await contentManageService.fetchAllReviews();
        res.status(200).json({ reviews });
    } catch (error) {
        next(error);
    }
};

const FetchReviews = async (req, res, next) => {
    try {
        const { pageIndex, limit } = req.query;
        const parsedPageIndex = parseInt(pageIndex, 10);
        const parsedLimit = parseInt(limit, 10);
        const result = await contentManageService.fetchReviews(parsedPageIndex, parsedLimit);
        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

const AddReview = async (req, res, next) => {
    try {
        const profile = req.file;
        let profilePath = (profile && profile.path) || null;
        const data = {
            ...req.body,
            rating: Number(req.body.rating),
            profile: profilePath
        };
        await contentManageService.addReview(data);
        res.status(200).send('Review added successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const data = {
            ...req.body,
            rating: Number(req.body.rating),
        };
        if (req.file && req.file.mimetype.startsWith('image/')) {
            data.profile = req.file.path;
        }
        else {
            delete data.profile;
        }
        await contentManageService.updateReview(reviewId, data);
        res.status(200).send('Review updated successfully!');
    } catch (error) {
        next(error);
    }
};

const DeleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        await contentManageService.deleteReview(reviewId);
        res.status(200).send('Review deleted successfully!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    CreateContentManage,
    FetchContactDetails,
    UpdateContactDetails,
    FetchAllFeatures,
    FetchFeatures,
    AddFeature,
    UpdateFeature,
    DeleteFeature,
    FetchAllPages,
    FetchPages,
    AddPage,
    UpdatePage,
    DeletePage,
    FetchAllFaqCategories,
    AddFaqCategory,
    UpdateFaqCategory,
    DeleteFaqCategory,
    FetchAllFaqsByCategory,
    AddFaqByCategory,
    UpdateFaqByCategory,
    DeleteFaqByCategory,
    FetchAllReviews,
    FetchReviews,
    AddReview,
    UpdateReview,
    DeleteReview
};
