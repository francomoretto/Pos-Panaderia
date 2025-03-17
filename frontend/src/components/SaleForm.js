import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Grid } from '@mui/material';
import axios from 'axios';

const SaleForm = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchClientsAndProducts = async () => {
      const [clientResponse, productResponse] = await Promise.all([
        axios.get('/api/clients'),
        axios.get('/api/products')
      ]);

      setClients(clientResponse.data);
      setProducts(productResponse.data);
    };

    fetchClientsAndProducts();
  }, []);

  const handleAddProduct = (product) => {
    setSelectedProducts([...selectedProducts, { product, quantity }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = {
      client: selectedClient,
      products: selectedProducts.map(sp => ({ product: sp.product._id, quantity: sp.quantity })),
      total: selectedProducts.reduce((sum, sp) => sum + (sp.product.price * sp.quantity), 0)
    };

    try {
      await axios.post('/api/sales', saleData);
      // Reset form after successful sale creation
      setSelectedClient('');
      setSelectedProducts([]);
      setQuantity(1);
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center">New Sale</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              <Select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                {clients.map(client => (
                  <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value=""
                onChange={(e) => handleAddProduct(products.find(p => p._id === e.target.value))}
              >
                {products.map(product => (
                  <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Sale
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h6">Selected Products</Typography>
      {selectedProducts.map((sp, index) => (
        <Typography key={index}>{sp.product.name} x {sp.quantity}</Typography>
      ))}
      <Typography variant="h6">
        Total: ${selectedProducts.reduce((sum, sp) => sum + (sp.product.price * sp.quantity), 0).toFixed(2)}
      </Typography>
    </Container>
  );
};

export default SaleForm;