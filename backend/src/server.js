const express = require("express");
const connectDB = require("./config/db"); // Corregir la ruta del archivo

const app = express();

// Conectar a MongoDB
connectDB();

app.use(express.json()); // Habilitar JSON en el backend

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/clients', require('./routes/clientRoutes')); // Agregar esta línea
app.use('/api/products', require('./routes/productRoutes')); // Agregar esta línea
app.use('/api/sales', require('./routes/saleRoutes')); // Agregar esta línea
// Agrega más rutas aquí


