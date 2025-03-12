const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const registerUser = [
  // Validaciones
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Controlador
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

const loginUser = [
  // Validaciones
  check('email').isEmail().withMessage('Email is invalid'),
  check('password').exists().withMessage('Password is required'),

  // Controlador
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

module.exports = {
  registerUser,
  loginUser,
};