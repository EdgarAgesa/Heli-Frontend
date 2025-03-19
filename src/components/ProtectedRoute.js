// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, redirectPath = '/', children }) => {
  if (!isAdmin) {
    // Redirect to the specified path if the user is not an admin
    return <Navigate to={redirectPath} replace />;
  }

  // Render the children (protected component) if the user is an admin
  return children;
};

export default ProtectedRoute;