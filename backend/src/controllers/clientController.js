const Client = require('../models/Client');
const { check, validationResult } = require('express-validator');

const createClient = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone').optional().isString(),
  check('address').optional().isString(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, address } = req.body;

    try {
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ message: 'Client already exists' });
      }

      const client = new Client({
        name,
        email,
        phone,
        address,
      });

      await client.save();
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const updateClient = [
  check('name').optional().not().isEmpty().withMessage('Name is required'),
  check('email').optional().isEmail().withMessage('Email is invalid'),
  check('phone').optional().isString(),
  check('address').optional().isString(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, address } = req.body;

    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      if (name) client.name = name;
      if (email) client.email = email;
      if (phone) client.phone = phone;
      if (address) client.address = address;

      await client.save();
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.remove();
    res.json({ message: 'Client removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createClient,
  updateClient,
  deleteClient,
  getClients,
  getClientById,
};