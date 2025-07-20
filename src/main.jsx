// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';

// Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modal setup
import Modal from 'react-modal';
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      {/* Temporarily disabled AdminProvider to avoid conflicts */}
      {/* <AdminProvider> */}
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          toastClassName="toast-brand"     // ← custom class
          bodyClassName="toast-brand-body" // ← if you want to style the text
        />
      {/* </AdminProvider> */}
    </AuthProvider>
  </BrowserRouter>
);
