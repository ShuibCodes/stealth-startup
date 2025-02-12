import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Prevent flashing redirect during Firebase auth check

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
