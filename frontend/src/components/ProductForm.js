import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import API from '../services/api';

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
        await API.put(`/products/${productId}`, productData);
      } else {
        await API.post('/products', productData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center">{productId ? 'Edit Product' : 'Add Product'}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {productId ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductForm;