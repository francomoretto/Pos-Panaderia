import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ProductForm = ({ productId, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (productId) {
      axios.get(`/api/products/${productId}`).then((response) => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
      });
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, description };
    try {
      if (productId) {
        await axios.put(`/api/products/${productId}`, productData);
      } else {
        await axios.post('/api/products', productData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">{productId ? 'Edit Product' : 'Add Product'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {productId ? 'Update' : 'Add'}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;