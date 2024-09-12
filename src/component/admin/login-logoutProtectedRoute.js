import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
    // return isAuthenticated ? children : <Navigate to="/login" />;
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
      
      return children;
    };