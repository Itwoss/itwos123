import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a simple implementation - in a real app, you would connect to an auth context
function ProtectedRoute({ children, adminOnly = false }) {
  // Mock authentication for now
  const isAuthenticated = false;  // Would be from auth context
  const isAdmin = false;          // Would be from auth context
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

export default ProtectedRoute;
