import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClientManagement from './pages/ClientManagement';
import ProductManagement from './pages/ProductManagement';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/clientForms" element={<ClientManagement />} />
      <Route path="/products" element={<ProductManagement />} />
    </Routes>
  );
};

export default App;