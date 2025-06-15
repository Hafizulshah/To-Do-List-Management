import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ToDoApp from './ToDoApp.jsx';
import Footer from './Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoApp />
    <Footer />
  </StrictMode>,
);