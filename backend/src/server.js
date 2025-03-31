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
const cors = require("cors");
app.use(cors());

dotenv.config();

app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Rutas
app.use('/api/User', require('./routes/userRoutes'));
app.use('/api/Client', require('./routes/clientRoutes')); // Agregar esta línea
app.use('/api/Product', require('./routes/productRoutes')); // Agregar esta línea
app.use('/api/Sale', require('./routes/saleRoutes')); // Agregar esta línea
// Agrega más rutas aquí


