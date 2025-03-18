import React, { useState } from 'react';
import ClientForm from '../components/ClientForms';
import API from '../services/api';
import { Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const handleSave = async (clientData) => {
    try {
      const response = await API.post('/clients', clientData);
      setClients([...clients, response.data]);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <div>
      <ClientForm onSave={handleSave} />
    </div>
  );
};

export default ClientManagement;
