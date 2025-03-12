const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');

const createSale = [
  check('client').not().isEmpty().withMessage('Client is required'),
  check('products').isArray().withMessage('Products must be an array'),
  check('products.*.product').not().isEmpty().withMessage('Product is required'),
  check('products.*.quantity').isNumeric().withMessage('Quantity must be a number'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { client, products } = req.body;

    try {
      const clientExists = await Client.findById(client);
      if (!clientExists) {
        return res.status(404).json({ message: 'Client not found' });
      }

      let total = 0;
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ message: `Product not found: ${item.product}` });
        }
        total += product.price * item.quantity;
      }

      const sale = new Sale({
        client,
        products,
        total,
      });

      await sale.save();
      res.status(201).json(sale);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('client').populate('products.product');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('client').populate('products.product');
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
};