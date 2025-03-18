import React from 'react';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const ProductManagement = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ProductForm />
    </div>
  );
};

export default ProductManagement;
