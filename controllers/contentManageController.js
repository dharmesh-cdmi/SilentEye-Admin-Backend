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

module.exports = {
    CreateContentManage,
    FetchContactDetails,
    UpdateContactDetails,
    FetchAllFeatures,
    FetchFeatures,
    AddFeature,
    UpdateFeature,
    DeleteFeature
};
