const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');

const createProduct = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('price').isNumeric().withMessage('Price must be a number'),
  check('description').optional().isString(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, description } = req.body;

    try {
      const product = new Product({
        name,
        price,
        description,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const updateProduct = [
  check('name').optional().not().isEmpty().withMessage('Name is required'),
  check('price').optional().isNumeric().withMessage('Price must be a number'),
  check('description').optional().isString(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, description } = req.body;

    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (name) product.name = name;
      if (price) product.price = price;
      if (description) product.description = description;

      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};