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
        const data = req.body;
        await contentManageService.addFeature(data);
        res.status(200).send('Feature added successfully!');
    } catch (error) {
        next(error);
    }
};

const UpdateFeature = async (req, res, next) => {
    try {
        const { featureId } = req.params;
        const data = req.body;
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
    DeletePage

};
