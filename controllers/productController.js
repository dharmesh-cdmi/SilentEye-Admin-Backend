// controllers/productController.js

const productService = require('../services/productService');
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS_MESSAGE,
  HTTP_STATUS,
} = require('../utils/responseHelper');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[201],
      product,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterStatus } = req.query;
    const products = await productService.getAllProducts(
      page,
      limit,
      search,
      filterStatus
    );
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      products,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      product,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      product,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    return apiSuccessResponse(
      res,
      HTTP_STATUS_MESSAGE[200],
      { message: 'Product deleted successfully' },
      HTTP_STATUS.OK
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      HTTP_STATUS_MESSAGE[500],
      error?.message ?? error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
