// services/productService.js

const Product = require('../models/productModel');
const paymentService = require('./paymentService');

// Create a new product
const createProduct = async (data) => {
  try {
    const pgData = {
      paymentGatewayId: data?.paymentGatewayId,
      name: data?.title,
      amount: data?.mrp,
      currency: 'usd',
      images: [data?.image],
    };

    const pgProduct = await paymentService.createStripeItem(pgData);

    data = {
      ...data,
      paymentGatewayId: data?.paymentGatewayId,
      pgProductId: pgProduct?.data?.product,
      pgPriceId: pgProduct?.data?.id,
    };

    const product = new Product(data);
    await product.save();

    return {
      status: true,
      data: product,
      message: 'Product created successfully',
    };
  } catch (error) {
    return {
      status: true,
      error: true,
      message: 'Error in creating product: ' + error,
    };
  }
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
  try {
    let product = await getProductById(id);
    if (!product) {
      throw new Error('Product not found!');
    }

    const pgData = {
      paymentGatewayId: product?.paymentGatewayId,
      productId: product?.pgProductId,
      name: data?.title,
      productMetadata: data?.productMetadata ? data.productMetadata : undefined,
      priceId: product?.pgPriceId,
      amount: data?.mrp ? data.mrp : undefined,
      priceMetadata: data?.priceMetadata ? data.priceMetadata : undefined,
    };

    const pgProduct = await paymentService.updateStripeItem(pgData);

    if (!pgProduct) {
      throw new Error('Product not updated on stripe!');
    }

    product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return {
      status: true,
      data: product,
      message: 'Product updated successfully',
    };
  } catch (error) {
    return {
      status: true,
      error: true,
      message: 'Error in updating product: ' + error,
    };
  }
};

// Delete a product by ID
const deleteProduct = async (id) => {
  try {
    let product = await getProductById(id);

    if (!product) {
      throw new Error('Product not found!');
    }

    const pgData = {
      paymentGatewayId: product?.paymentGatewayId,
      itemId: product?.pgProductId,
    };

    const pgProduct = await paymentService.deleteStripeItem(pgData);

    if (!pgProduct) {
      throw new Error('Product not deleted on stripe!');
    }

    await Product.findByIdAndDelete(id);

    return {
      status: true,
      data: product,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return {
      status: true,
      error: true,
      message: 'Error in deleting product: ' + error,
    };
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
