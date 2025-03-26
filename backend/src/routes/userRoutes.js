const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const User = require('../models/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Registro de usuario
router.post('/register', registerUser);

// Inicio de sesión de usuario
router.post('/login', loginUser);

module.exports = router;
