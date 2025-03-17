import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import axios from 'axios';

const ClientForm = ({ clientId, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (clientId) {
      axios.get(`/api/clients/${clientId}`).then((response) => {
        const client = response.data;
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone);
        setAddress(client.address);
      });
    }
  }, [clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = { name, email, phone, address };
    try {
      if (clientId) {
        await axios.put(`/api/clients/${clientId}`, clientData);
      } else {
        await axios.post('/api/clients', clientData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center">{clientId ? 'Edit Client' : 'Add Client'}</Typography>
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
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {clientId ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ClientForm;