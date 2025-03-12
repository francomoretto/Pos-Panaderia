const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProductById } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);

module.exports = router;
