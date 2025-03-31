import React from 'react';
import { Container } from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForms';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await API.post('/User/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Container>
      <RegisterForm onSubmit={handleRegister} />
    </Container>
  );
};

export default Register;