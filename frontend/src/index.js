import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiar importación
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usar createRoot
root.render(
  <React.StrictMode>
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <App />
    </Router>
  </React.StrictMode>
);