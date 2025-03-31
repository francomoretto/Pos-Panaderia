const express = require('express');
const router = express.Router();
const { createClient, updateClient, deleteClient, getClients, getClientById } = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createClient);
router.put('/:id', authMiddleware, updateClient);
router.delete('/:id', authMiddleware, deleteClient);
router.get('/', authMiddleware, getClients);
router.get('/:id', authMiddleware, getClientById);

module.exports = router;