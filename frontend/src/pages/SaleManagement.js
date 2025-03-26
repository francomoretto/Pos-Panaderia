import React, { useEffect, useState } from 'react';
import SaleForm from '../components/SaleForm';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Corregir aquí
import axios from 'axios';

const SaleManagement = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientsAndProducts = async () => {
      try {
        const [clientsResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/clients'), // Corregir URL
          axios.get('http://localhost:5000/api/products') // Corregir URL
        ]);
        // ...existing code...
      } catch (err) {
        setError(err);
        console.error('Error fetching data:', err);
      }
    };

    fetchClientsAndProducts();
  }, []);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      <SaleForm />
      <Button variant="contained" color="secondary" fullWidth onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default SaleManagement;
