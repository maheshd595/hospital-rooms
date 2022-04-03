import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItemFromLocalStorage } from '../services/storageService';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getItemFromLocalStorage('user');

  return isAuthenticated ? children : <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string,
};
export default ProtectedRoute;
