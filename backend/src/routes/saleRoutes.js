const express = require('express');
const router = express.Router();
const { createSale, getSales, getSaleById } = require('../controllers/saleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createSale);
router.get('/', authMiddleware, getSales);
router.get('/:id', authMiddleware, getSaleById);

module.exports = router;