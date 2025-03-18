import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClientManagement from './pages/ClientManagement';
import ProductManagement from './pages/ProductManagement';
import SaleManagement from './pages/SaleManagement'; // Importar la nueva página

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/clientForms" element={<ClientManagement />} />
      <Route path="/products" element={<ProductManagement />} />
      <Route path="/sales" element={<SaleManagement />} /> {/* Agregar la nueva ruta */}
    </Routes>
  );
};

export default App;