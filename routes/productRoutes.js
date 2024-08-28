// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../middleware/multerMiddleware');

router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]),
  productController.createProduct
);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]),
  productController.updateProduct
);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
