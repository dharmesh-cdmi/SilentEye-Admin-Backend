const { createManager, updateManager, deleteManager, fetchAllManagers } = require("../services/managerService");
const { apiSuccessResponse, HTTP_STATUS, HTTP_STATUS_MESSAGE, apiErrorResponse } = require("../utils/responseHelper");

// Fetch all managers with pagination and search functionality
const FetchAllManagers = async (req, res) => {
    try {
        const managers = await fetchAllManagers(req?.query);
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], managers, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Create a new manager
const CreateManager = async (req, res) => {
    try {
        const manager = await createManager(req?.body);
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], manager, HTTP_STATUS.CREATED);
    } catch (error) {
        console.log('Error: ', error);
        if (error.code === 11000) {
            return apiErrorResponse(res, 'Email already exists', error, HTTP_STATUS.CONFLICT);
        }
        return apiErrorResponse(res, error?.message || HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Update an existing manager
const UpdateManager = async (req, res) => {
    try {
        const manager = await updateManager(req?.params?.id, req?.body);
        if (!manager) {
            return apiErrorResponse(res, 'Manager not found', null, HTTP_STATUS.NOT_FOUND);
        }
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], manager, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Delete a manager
const DeleteManager = async (req, res) => {
    try {
        const manager = await deleteManager(req?.params?.id);
        if (!manager) {
            return apiErrorResponse(res, 'Manager not found', null, HTTP_STATUS.NOT_FOUND);
        }
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], manager, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    FetchAllManagers,
    CreateManager,
    UpdateManager,
    DeleteManager
};
