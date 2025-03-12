import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container>
      <Typography variant="h4">Home Panificadora Arroyito</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/clientForms')}>
        Manage Clients
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
        Manage Products
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/sales')}>
        Make a Sale
      </Button>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Home;