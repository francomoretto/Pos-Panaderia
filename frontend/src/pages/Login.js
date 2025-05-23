import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Grid } from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`); // Mostrar mensaje del backend
      } else {
        alert('Error: Unable to login. Please try again.');
      }
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" align="center">Login</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/register')} // Asegúrate de que esta ruta coincida con la definida en App.js
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message="Registrado satisfactoriamente"
        onClose={handleSnackbarClose}
      />
    </Container>
  );
};

export default Login;