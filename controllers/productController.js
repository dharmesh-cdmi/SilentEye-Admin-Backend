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
    // Extract files from req.files
    const files = req.files;
    const mainImage = files?.mainImage?.[0]?.path; // Assuming you are storing the file path
    const image2 = files?.image2?.[0]?.path || null;

    // Merge the file paths into req.body
    const productData = {
      ...req.body,
      mainImage, // Attach the mainImage path to the body
      image2, // Attach the image2 path if available
    };

    const product = await productService.createProduct(productData);
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
