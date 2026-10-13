// src/routes/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { authContext } from '../layouts/AuthProvider/AuthProvider'; // Verify relative path
import Loading from './Loading';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(authContext) || {};
  const location = useLocation();

  // 1. Show loading spinner while Firebase initializes on refresh
  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  // 2. Redirect to Login if unauthenticated, saving target path in location.state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Render private content if logged in
  return children;
}