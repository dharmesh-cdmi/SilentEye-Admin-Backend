// services/productService.js
const Product = require('../models/productModel');
const paymentService = require('./paymentService');

// Create a new product
const createProduct = async (data) => {
  const product = new Product(data);
  await product.save();
  const stripeData = {
    paymentGatewayId: data?.paymentGatewayId,
    name: data?.title,
    amount: data?.mrp,
    currency: 'usd',
  };
  await paymentService.createStripeProduct(stripeData);
  return product;
};

// Get all products
const getAllProducts = async () => {
  return await Product.find({});
};

// Get a single product by ID
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found!');
  }
  return product;
};

// Update a product by ID
const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new Error('Product not found!');
  }
  return product;
};

// Delete a product by ID
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Product not found!');
  }
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
