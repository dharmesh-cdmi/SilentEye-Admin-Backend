const { fetchAllMangers, createManager, updateManager, deleteManager } = require("../services/managerService");
const { apiSuccessResponse, HTTP_STATUS, HTTP_STATUS_MESSAGE, apiErrorResponse } = require("../utils/responseHelper");

const FetchAllManagers = async (req, res) => {
    try {
        const managers = await fetchAllMangers(req?.query)
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], managers, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

const CreateManager = async (req, res) => {
    try {
        const manager = await createManager(req?.body)
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[201], manager, HTTP_STATUS.CREATED)
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

const UpdateManager = async (req, res) => {
    try {
        const manager = await updateManager(req?.params?.id, req?.body)
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], manager, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

const DeleteManager = async (req, res) => {
    try {
        const manager = await deleteManager(req?.params?.id)
        return apiSuccessResponse(res, HTTP_STATUS_MESSAGE[200], manager, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, HTTP_STATUS_MESSAGE[500], error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    FetchAllManagers,
    CreateManager,
    UpdateManager,
    DeleteManager
}

