import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClientManagement from './pages/ClientManagement';
import ProductManagement from './pages/ProductManagement';
import SaleManagement from './pages/SaleManagement';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/" element={<Home />} />
      <Route path="/clientForms" element={<ClientManagement />} />
      <Route path="/products" element={<ProductManagement />} />
      <Route path="/sales" element={<SaleManagement />} />
    </Routes>
  );
};

export default App;