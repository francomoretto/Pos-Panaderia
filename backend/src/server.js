const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User"); // ✅ Importación correcta

dotenv.config();
const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(err => console.error("❌ Error de conexión:", err));

// Función para obtener usuarios
async function getUsers() {
    try {
        const users = await User.find(); // ✅ Asegurar que User está importado correctamente
        console.log("Usuarios encontrados:", users);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
    }
}

// Ejecutar la función
getUsers();

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
